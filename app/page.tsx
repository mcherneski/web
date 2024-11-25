'use client';

import { useEffect, useState, Suspense } from 'react';
import { Task } from './interfaces';
import { useSearchParams } from 'next/navigation';
import { Tasks } from './components/custom/tasks'
// Add this type declaration at the top of the file
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
      };
    };
  }
}

function HomeContent() {
  const [tasks, setTasks] = useState<Task[]>([])
  const searchParams = useSearchParams();

  const handleTaskComplete = (taskId: number, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  useEffect(() => {
    
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initData;

      fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            // Proceed with using the data
            console.log('Data is valid');
          } else {
            // Handle invalid data
            console.error('Invalid data');
          }
        })
        .catch((error) => {
          console.error('Error validating data:', error);
        });

      const data = searchParams.get('data')
      if (data) {
        const customData = JSON.parse(decodeURIComponent(data))
        setTasks(customData.tasks)
      }
    }
  }, [tasks, setTasks, searchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Telegram Web App</h1>
      <Tasks tasks={tasks} onTaskComplete={handleTaskComplete} />
    </div>
  );
}

function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

export default Home;

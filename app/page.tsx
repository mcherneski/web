'use client';

import { useEffect, useState, Suspense } from 'react';
import { Task } from './interfaces';
import { useSearchParams } from 'next/navigation';
import { TaskItem } from './components/custom/task'
// Add this type declaration at the top of the file

function HomeContent() {
  const [tasks, setTasks] = useState<Task[]>([])
  const searchParams = useSearchParams();

  const handleTaskComplete = (taskId: number, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }

    if (window.Telegram?.WebApp) {
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
  }, [searchParams]);

  console.log(tasks)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Telegram Web App</h1>
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onComplete={handleTaskComplete} 
          />
        ))}
      </div>
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

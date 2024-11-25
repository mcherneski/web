'use client'

import { Task } from '@/app/interfaces'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface TaskProps {
  task: Task
  onComplete?: (taskId: number, completed: boolean) => void
}

export function TaskItem({ task, onComplete }: TaskProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <Accordion type="single" collapsible>
          <AccordionItem value={`task-${task.id}`} className="border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={(checked) => 
                    onComplete?.(task.id, checked as boolean)
                  }
                />
                <AccordionTrigger className="hover:no-underline">
                  <span className={cn(
                    "text-lg font-medium",
                    task.completed && "line-through text-gray-500"
                  )}>
                    {task.title}
                  </span>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent>
              <div className="mt-4 space-y-2 pl-10">
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">Description:</p>
                  <p className="mt-1">{task.description}</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">From:</p>
                  <p className="mt-1">@{task.fromUsername}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

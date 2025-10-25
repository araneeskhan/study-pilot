"use client";

import { useNotificationStore } from "@/stores/notification-store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap = {
  success: "✓",
  error: "✗",
  warning: "⚠",
  info: "ℹ",
};

const variantMap = {
  success: "default",
  error: "destructive",
  warning: "default",
  info: "default",
};

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] w-80 space-y-3">
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          className={cn(
            "relative shadow-lg border-2 animate-in slide-in-from-right duration-300",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            notification.type === "success" && "bg-green-50 border-green-300 text-green-900",
            notification.type === "error" && "bg-red-50 border-red-300 text-red-900",
            notification.type === "warning" && "bg-yellow-50 border-yellow-300 text-yellow-900",
            notification.type === "info" && "bg-blue-50 border-blue-300 text-blue-900"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-white/20 rounded-full"
            onClick={() => removeNotification(notification.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-start gap-3 pr-6">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-white font-bold text-sm",
              notification.type === "success" && "bg-green-500",
              notification.type === "error" && "bg-red-500",
              notification.type === "warning" && "bg-yellow-500",
              notification.type === "info" && "bg-blue-500"
            )}>
              {iconMap[notification.type]}
            </div>
            <div className="flex-1 min-w-0">
              <AlertTitle className="text-sm font-semibold leading-tight">
                {notification.title}
              </AlertTitle>
              {notification.message && (
                <AlertDescription className="text-xs mt-1 leading-relaxed">
                  {typeof notification.message === 'string' 
                    ? notification.message 
                    : typeof notification.message === 'object' && notification.message !== null
                    ? (notification.message as any).message || JSON.stringify(notification.message)
                    : String(notification.message)}
                </AlertDescription>
              )}
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
}
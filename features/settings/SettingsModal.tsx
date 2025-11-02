"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
export function SettingsModal() {
  return (
    <Dialog>
      {/*Trigger Button*/}
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Settings />
          <span>Open Settings</span>
        </Button>
      </DialogTrigger>
      {/*Dialog Content*/}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Cierra al terminar</DialogDescription>
        </DialogHeader>
        {/* 3. Contenido de ejemplo (un formulario) */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              defaultValue="Mi Cronómetro"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Usuario
            </Label>
            <Input
              id="username"
              defaultValue="@usuario"
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

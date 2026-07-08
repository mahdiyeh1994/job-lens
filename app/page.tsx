'use client';
import { Button } from '@/components/ui/button';
import AddApplicationDialog from '@/components/form/addApplicationDialog';
import { useState } from 'react';

export default function Home() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-6 sm:px-10">
        <Button onClick={() => setIsAddModalVisible(true)}>
          Add Application
        </Button>
        <AddApplicationDialog
          open={isAddModalVisible}
          onOpenChange={setIsAddModalVisible}
        />
      </main>
    </div>
  );
}

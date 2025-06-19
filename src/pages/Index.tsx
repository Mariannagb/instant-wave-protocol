
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from '@/components/ChatInterface';
import ArchitectureDashboard from '@/components/ArchitectureDashboard';
import InfrastructureOverview from '@/components/InfrastructureOverview';
import MonitoringDashboard from '@/components/MonitoringDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sistema de Mensagens Instantâneas
          </h1>
          <p className="text-lg text-gray-600">
            Infraestrutura Escalável para Comunicação em Tempo Real
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="chat">Chat Interface</TabsTrigger>
            <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
            <TabsTrigger value="infrastructure">Infraestrutura</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="architecture">
            <ArchitectureDashboard />
          </TabsContent>

          <TabsContent value="infrastructure">
            <InfrastructureOverview />
          </TabsContent>

          <TabsContent value="monitoring">
            <MonitoringDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

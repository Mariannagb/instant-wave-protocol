
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Server, Database, Cloud, Shield, Zap, Globe } from 'lucide-react';

const ArchitectureDashboard = () => {
  const architectureComponents = [
    {
      name: 'Load Balancer',
      icon: <Globe className="h-6 w-6" />,
      description: 'AWS ALB/NGINX - Distribuição de conexões',
      status: 'active',
      metrics: '99.9% uptime'
    },
    {
      name: 'API Gateway',
      icon: <Server className="h-6 w-6" />,
      description: 'Roteamento e autenticação JWT',
      status: 'active',
      metrics: '50ms latência média'
    },
    {
      name: 'WebSocket Servers',
      icon: <Zap className="h-6 w-6" />,
      description: 'Node.js/Go - Conexões persistentes',
      status: 'active',
      metrics: '10K conexões ativas'
    },
    {
      name: 'Message Broker',
      icon: <ArrowRight className="h-6 w-6" />,
      description: 'Apache Kafka - Filas de mensagens',
      status: 'active',
      metrics: '1M msg/s processadas'
    },
    {
      name: 'Cache Layer',
      icon: <Zap className="h-6 w-6" />,
      description: 'Redis - Mensagens não entregues',
      status: 'active',
      metrics: '2ms latência'
    },
    {
      name: 'Database',
      icon: <Database className="h-6 w-6" />,
      description: 'Cassandra/DynamoDB - Armazenamento',
      status: 'active',
      metrics: '500GB armazenados'
    },
    {
      name: 'CDN & Storage',
      icon: <Cloud className="h-6 w-6" />,
      description: 'AWS S3 + CloudFront - Mídia',
      status: 'active',
      metrics: '10TB transferidos'
    },
    {
      name: 'Security Layer',
      icon: <Shield className="h-6 w-6" />,
      description: 'Criptografia ponta-a-ponta',
      status: 'active',
      metrics: 'AES-256 + TLS 1.3'
    }
  ];

  const dataFlow = [
    'Cliente',
    'Load Balancer',
    'API Gateway',
    'WebSocket Server',
    'Message Broker',
    'Database',
    'Cache',
    'CDN'
  ];

  return (
    <div className="space-y-6">
      {/* Fluxo de Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5" />
            <span>Fluxo de Dados da Arquitetura</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center space-x-2 space-y-2">
            {dataFlow.map((component, index) => (
              <div key={component} className="flex items-center">
                <Badge
                  variant="outline"
                  className="px-4 py-2 bg-blue-50 border-blue-200"
                >
                  {component}
                </Badge>
                {index < dataFlow.length - 1 && (
                  <ArrowRight className="h-4 w-4 mx-2 text-blue-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Componentes da Arquitetura */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {architectureComponents.map((component) => (
          <Card key={component.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-blue-600">{component.icon}</div>
                  <Badge
                    variant={component.status === 'active' ? 'default' : 'secondary'}
                    className={component.status === 'active' ? 'bg-green-500' : ''}
                  >
                    {component.status}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg">{component.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                {component.description}
              </p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                {component.metrics}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desafios e Soluções */}
      <Card>
        <CardHeader>
          <CardTitle>Principais Desafios e Soluções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Desafio: Picos de Tráfego</h4>
              <p className="text-sm text-red-700">
                <strong>Solução:</strong> Auto-scaling baseado em CPU/conexões ativas com Kubernetes
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Desafio: Latência</h4>
              <p className="text-sm text-yellow-700">
                <strong>Solução:</strong> Edge computing com AWS Lambda@Edge e CDN global
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Desafio: Segurança</h4>
              <p className="text-sm text-green-700">
                <strong>Solução:</strong> Criptografia ponta-a-ponta com Signal Protocol
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitectureDashboard;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  MessageSquare, 
  Clock,
  HardDrive,
  Cpu
} from 'lucide-react';

const InfrastructureOverview = () => {
  const infrastructureMetrics = [
    {
      title: 'Usuários Ativos',
      value: '2.5M',
      change: '+12%',
      icon: <Users className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      title: 'Mensagens/Segundo',
      value: '45K',
      change: '+8%',
      icon: <MessageSquare className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      title: 'Latência Média',
      value: '42ms',
      change: '-5ms',
      icon: <Clock className="h-5 w-5" />,
      color: 'text-purple-600'
    },
    {
      title: 'Uptime',
      value: '99.98%',
      change: '+0.02%',
      icon: <Zap className="h-5 w-5" />,
      color: 'text-orange-600'
    }
  ];

  const resourceUtilization = [
    { name: 'CPU', usage: 65, max: 100, unit: '%' },
    { name: 'Memória', usage: 78, max: 100, unit: '%' },
    { name: 'Armazenamento', usage: 45, max: 100, unit: '%' },
    { name: 'Rede', usage: 32, max: 100, unit: '%' }
  ];

  const services = [
    {
      name: 'Load Balancer',
      status: 'healthy',
      instances: 3,
      region: 'us-east-1'
    },
    {
      name: 'API Gateway',
      status: 'healthy',
      instances: 5,
      region: 'multi-region'
    },
    {
      name: 'WebSocket Servers',
      status: 'healthy',
      instances: 12,
      region: 'multi-region'
    },
    {
      name: 'Kafka Cluster',
      status: 'healthy',
      instances: 6,
      region: 'us-east-1'
    },
    {
      name: 'Redis Cache',
      status: 'healthy',
      instances: 4,
      region: 'multi-region'
    },
    {
      name: 'Cassandra DB',
      status: 'healthy',
      instances: 9,
      region: 'multi-region'
    }
  ];

  const securityFeatures = [
    'Criptografia TLS 1.3',
    'Signal Protocol E2E',
    'JWT Authentication',
    'Rate Limiting',
    'DDoS Protection',
    'WAF Enabled'
  ];

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {infrastructureMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <Badge variant="outline" className="text-xs text-green-600">
                      {metric.change}
                    </Badge>
                  </div>
                </div>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Utilização de Recursos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cpu className="h-5 w-5" />
            <span>Utilização de Recursos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceUtilization.map((resource) => (
              <div key={resource.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{resource.name}</span>
                  <span className="text-sm text-gray-600">
                    {resource.usage}{resource.unit}
                  </span>
                </div>
                <Progress 
                  value={resource.usage} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status dos Serviços */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Status dos Serviços</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div 
                key={service.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-600">
                    {service.instances} instâncias • {service.region}
                  </p>
                </div>
                <Badge 
                  variant={service.status === 'healthy' ? 'default' : 'destructive'}
                  className={service.status === 'healthy' ? 'bg-green-500' : ''}
                >
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recursos de Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Recursos de Segurança</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {securityFeatures.map((feature) => (
              <div 
                key={feature}
                className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Escalabilidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Configurações de Escalabilidade</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                Escalabilidade Horizontal
              </h4>
              <p className="text-sm text-blue-700">
                Auto-scaling baseado em métricas de CPU e conexões ativas
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">
                Multi-Região
              </h4>
              <p className="text-sm text-purple-700">
                Distribuição global com failover automático entre regiões
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">
                Edge Computing
              </h4>
              <p className="text-sm text-orange-700">
                Lambda@Edge para redução de latência e proximidade aos usuários
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfrastructureOverview;

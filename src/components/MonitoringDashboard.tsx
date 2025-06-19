
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Activity, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const MonitoringDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dados simulados para os gráficos
  const latencyData = [
    { time: '00:00', latency: 45 },
    { time: '00:05', latency: 42 },
    { time: '00:10', latency: 48 },
    { time: '00:15', latency: 41 },
    { time: '00:20', latency: 44 },
    { time: '00:25', latency: 39 },
    { time: '00:30', latency: 43 }
  ];

  const throughputData = [
    { time: '00:00', messages: 42000 },
    { time: '00:05', messages: 45000 },
    { time: '00:10', messages: 48000 },
    { time: '00:15', messages: 44000 },
    { time: '00:20', messages: 47000 },
    { time: '00:25', messages: 50000 },
    { time: '00:30', messages: 49000 }
  ];

  const errorData = [
    { service: 'API Gateway', errors: 2 },
    { service: 'WebSocket', errors: 1 },
    { service: 'Database', errors: 0 },
    { service: 'Cache', errors: 3 },
    { service: 'CDN', errors: 1 }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Alto uso de CPU no servidor ws-03',
      timestamp: new Date(Date.now() - 300000),
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Auto-scaling ativado: +2 instâncias',
      timestamp: new Date(Date.now() - 600000),
      severity: 'low'
    },
    {
      id: 3,
      type: 'success',
      message: 'Backup da base de dados concluído',
      timestamp: new Date(Date.now() - 900000),
      severity: 'low'
    }
  ];

  const systemMetrics = [
    {
      name: 'Conexões Ativas',
      value: '12.5K',
      change: '+5.2%',
      trend: 'up',
      status: 'healthy'
    },
    {
      name: 'Taxa de Erro',
      value: '0.02%',
      change: '-0.01%',
      trend: 'down',
      status: 'healthy'
    },
    {
      name: 'Throughput',
      value: '49K msg/s',
      change: '+12%',
      trend: 'up',
      status: 'healthy'
    },
    {
      name: 'Disponibilidade',
      value: '99.98%',
      change: '+0.01%',
      trend: 'up',
      status: 'healthy'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header com Tempo Real */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Dashboard de Monitoramento em Tempo Real</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-mono">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Métricas do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">
                  {metric.name}
                </p>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {metric.change}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{metric.value}</p>
                <Badge 
                  variant={metric.status === 'healthy' ? 'default' : 'destructive'}
                  className={metric.status === 'healthy' ? 'bg-green-500' : ''}
                >
                  {metric.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latência */}
        <Card>
          <CardHeader>
            <CardTitle>Latência (ms)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Throughput */}
        <Card>
          <CardHeader>
            <CardTitle>Throughput (Mensagens/s)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Erros por Serviço */}
      <Card>
        <CardHeader>
          <CardTitle>Erros por Serviço (Última Hora)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={errorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="errors" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alertas Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Alertas Recentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {alert.type === 'warning' && (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                  {alert.type === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {alert.type === 'info' && (
                    <Activity className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    alert.severity === 'high' ? 'border-red-200 text-red-600' :
                    alert.severity === 'medium' ? 'border-yellow-200 text-yellow-600' :
                    'border-blue-200 text-blue-600'
                  }
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ferramentas de Monitoramento */}
      <Card>
        <CardHeader>
          <CardTitle>Stack de Monitoramento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">
                Prometheus + Grafana
              </h4>
              <p className="text-sm text-orange-700">
                Coleta de métricas e visualização em tempo real
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">
                ELK Stack
              </h4>
              <p className="text-sm text-purple-700">
                Elasticsearch, Logstash e Kibana para análise de logs
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                AWS CloudWatch
              </h4>
              <p className="text-sm text-blue-700">
                Monitoramento nativo da infraestrutura AWS
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringDashboard;

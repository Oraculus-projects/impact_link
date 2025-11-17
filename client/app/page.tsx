'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            ImpactLink
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Transformando dados de tráfego por link em provas de impacto
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            Meça e visualize o impacto real do seu conteúdo através de tracking de links e dashboards analíticos
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Button asChild size="lg">
              <Link href="/login">
                Entrar
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">
                Criar Conta
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Links Inteligentes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Encurtador de links rastreáveis com classificação e tags para organizar seu conteúdo
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard de Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Visualização histórica, comparações e insights automáticos sobre seu tráfego
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Gere relatórios em PDF ou CSV com branding personalizado para seus clientes
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


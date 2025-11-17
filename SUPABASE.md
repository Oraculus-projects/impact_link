# 🚀 Guia de Configuração do Supabase

Este guia detalha como configurar o ImpactLink para usar o Supabase como banco de dados.

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com) (gratuita)
- Node.js 18 ou superior instalado
- Projeto ImpactLink clonado e dependências instaladas

## 🔧 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Preencha os dados:
   - **Name**: `impact-link` (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte e **anote-a** (você precisará dela)
   - **Region**: Escolha a região mais próxima
5. Clique em **"Create new project"**
6. Aguarde alguns minutos enquanto o projeto é criado

### 2. Obter Connection String

1. No dashboard do Supabase, vá em **Project Settings** (ícone de engrenagem)
2. Clique em **Database** no menu lateral
3. Role até a seção **"Connection string"**
4. Selecione **"URI"** no dropdown
5. Copie a connection string (ela terá o formato):
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

### 3. Configurar Variáveis de Ambiente

#### No Servidor (Backend)

1. Copie o arquivo de exemplo:
   ```bash
   cd server
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e substitua a `DATABASE_URL` pela connection string do Supabase:
   ```env
   DATABASE_URL="postgresql://postgres.abcdefghijklmnop:SUA_SENHA@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   ```

   **Importante**: 
   - Substitua `[YOUR-PASSWORD]` pela senha que você criou ao criar o projeto
   - O parâmetro `connection_limit=1` é importante para o Prisma funcionar corretamente com o pooler do Supabase
   - Se preferir usar conexão direta (sem pooler), use a porta `5432` ao invés de `6543` e remova o parâmetro `pgbouncer=true`

3. Configure as outras variáveis:
   ```env
   JWT_SECRET="gere-um-secret-seguro-aqui"
   JWT_EXPIRES_IN="7d"
   PORT=3001
   NODE_ENV=development
   APP_URL="http://localhost:3000"
   API_URL="http://localhost:3001"
   LINK_DOMAIN="localhost:3001"
   ```

   **Para gerar um JWT_SECRET seguro:**
   ```bash
   openssl rand -base64 32
   ```

#### No Cliente (Frontend)

1. Copie o arquivo de exemplo:
   ```bash
   cd client
   cp .env.example .env.local
   ```

2. O arquivo `.env.local` já está configurado corretamente para desenvolvimento:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_LINK_DOMAIN=localhost:3001
   ```

### 4. Executar Migrações do Banco de Dados

1. Gere o Prisma Client:
   ```bash
   cd server
   npm run prisma:generate
   ```

2. Execute as migrações para criar as tabelas no Supabase:
   ```bash
   npm run prisma:migrate
   ```

   Ou manualmente:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Verifique se as tabelas foram criadas:
   - No dashboard do Supabase, vá em **Table Editor**
   - Você deve ver as tabelas: `User`, `Agency`, `Client`, `Link`, `Campaign`, `Click`

### 5. (Opcional) Verificar Conexão com Prisma Studio

Para visualizar e gerenciar os dados diretamente:

```bash
cd server
npm run prisma:studio
```

Isso abrirá o Prisma Studio em `http://localhost:5555`

## 🔍 Verificando a Conexão

### Teste Rápido

1. Inicie o servidor:
   ```bash
   cd server
   npm run dev
   ```

2. Se tudo estiver correto, você verá:
   ```
   🚀 Server running on http://localhost:3001
   ```

3. Teste o endpoint de health check:
   ```bash
   curl http://localhost:3001/health
   ```

   Deve retornar:
   ```json
   {"status":"ok","timestamp":"2024-..."}
   ```

## 🎯 Tipos de Connection String do Supabase

### Connection Pooling (Recomendado para produção)

Usa o pooler do Supabase (porta 6543):
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**Vantagens:**
- Melhor para aplicações com muitas conexões
- Mais eficiente em recursos
- Recomendado para produção

### Direct Connection (Para desenvolvimento)

Conexão direta ao banco (porta 5432):
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

**Vantagens:**
- Mais simples
- Útil para desenvolvimento local
- Permite usar todas as features do PostgreSQL

## 🚨 Solução de Problemas

### Erro: "Can't reach database server"

- Verifique se a connection string está correta
- Confirme que substituiu `[YOUR-PASSWORD]` pela senha real
- Verifique se o projeto do Supabase está ativo (não pausado)

### Erro: "Connection limit exceeded"

- Use a connection string com pooler (porta 6543)
- Adicione `connection_limit=1` na URL
- Ou use a conexão direta (porta 5432)

### Erro: "Schema does not exist"

- Execute as migrações: `cd server && npm run prisma:migrate`
- Verifique se o schema está correto no `schema.prisma`

### Erro: "SSL required"

O Supabase requer SSL. O Prisma já configura isso automaticamente, mas se encontrar problemas:

1. Adicione `?sslmode=require` na connection string
2. Ou use a connection string com pooler que já inclui SSL

### Projeto Pausado

Projetos gratuitos do Supabase podem pausar após inatividade:
- Acesse o dashboard do Supabase
- Clique em "Restore" para reativar o projeto
- Aguarde alguns minutos

## 📚 Recursos Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Prisma com Supabase](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-supabase)
- [Connection Pooling no Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)

## 🎉 Próximos Passos

Após configurar o Supabase:

1. ✅ Execute `npm run dev` na raiz do projeto
2. ✅ Acesse `http://localhost:3000`
3. ✅ Crie sua primeira conta
4. ✅ Comece a usar o ImpactLink!

## 🔒 Segurança

- **Nunca** commite o arquivo `.env` no Git
- Use variáveis de ambiente diferentes para desenvolvimento e produção
- Rotacione o `JWT_SECRET` periodicamente
- Mantenha a senha do banco de dados segura


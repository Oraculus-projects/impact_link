# 🚀 Guia Rápido de Execução - ImpactLink

Este guia mostra como executar o projeto rapidamente.

## ⚡ Execução Rápida (1 comando)

Se você já configurou tudo, execute na raiz do projeto:

```bash
npm run dev
```

Isso iniciará:
- ✅ Backend em `http://localhost:3001`
- ✅ Frontend em `http://localhost:3000`

---

## 📋 Checklist Antes de Executar

### 1. ✅ Dependências Instaladas?

```bash
# Se ainda não instalou, execute:
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 2. ✅ Banco de Dados Configurado?

**Opção A: Supabase (Recomendado)**
- Crie um projeto em [supabase.com](https://supabase.com)
- Copie a connection string
- Configure no `server/.env`:
  ```bash
  cd server
  cp .env.example .env
  # Edite o .env e cole sua DATABASE_URL do Supabase
  ```

**Opção B: PostgreSQL Local**
- Configure `DATABASE_URL` no `server/.env`

### 3. ✅ Variáveis de Ambiente Configuradas?

**Server (`server/.env`):**
```bash
cd server
cp .env.example .env
# Edite o .env com suas configurações
```

**Client (`client/.env.local`):**
```bash
cd client
cp .env.example .env.local
# Já está configurado para desenvolvimento
```

### 4. ✅ Migrações do Banco Executadas?

```bash
cd server
npm run prisma:generate
npm run prisma:migrate
```

---

## 🎯 Executar o Projeto

### Opção 1: Executar Tudo Junto (Recomendado)

No diretório raiz:

```bash
npm run dev
```

### Opção 2: Executar Separadamente

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

---

## 🌐 Acessar a Aplicação

Após executar, acesse:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

---

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm run dev              # Inicia tudo
npm run dev:server       # Apenas backend
npm run dev:client       # Apenas frontend
```

### Banco de Dados
```bash
cd server
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações
npm run prisma:studio    # Abre Prisma Studio (http://localhost:5555)
```

### Build
```bash
cd client && npm run build  # Build do frontend
cd server && npm run build  # Build do backend
```

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```bash
# Reinstale as dependências
npm install
cd server && npm install
cd ../client && npm install
```

### Erro: "DATABASE_URL is not set"
```bash
# Configure o .env no servidor
cd server
cp .env.example .env
# Edite o .env com sua connection string
```

### Erro: "Port 3000 already in use"
```bash
# Pare o processo que está usando a porta ou altere no .env
```

### Erro: "Prisma Client not generated"
```bash
cd server
npm run prisma:generate
```

---

## 📚 Documentação Completa

- **Setup Completo**: Veja [SETUP.md](./SETUP.md)
- **Configuração Supabase**: Veja [SUPABASE.md](./SUPABASE.md)

---

## ✅ Verificação Rápida

Execute este comando para verificar se está tudo pronto:

```bash
# Verificar dependências
test -d node_modules && echo "✓ Raiz OK" || echo "✗ Execute: npm install"
test -d server/node_modules && echo "✓ Server OK" || echo "✗ Execute: cd server && npm install"
test -d client/node_modules && echo "✓ Client OK" || echo "✗ Execute: cd client && npm install"

# Verificar configuração
test -f server/.env && echo "✓ server/.env existe" || echo "✗ Crie server/.env"
test -f client/.env.local && echo "✓ client/.env.local existe" || echo "✗ Crie client/.env.local"
```

---

**Pronto para começar? Execute `npm run dev` na raiz do projeto! 🚀**


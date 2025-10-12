# 🧩 coTask — Desafio Backend com AdonisJS

## 📘 Descrição
O **coTask** é um desafio de **backend** desenvolvido com **AdonisJS**, voltado para criar uma **API RESTful** de gerenciamento de tarefas colaborativas.  
O foco é construir uma API completa com autenticação, validações e controle de permissões, **sem necessidade de frontend** — podendo ser testada com ferramentas como **Insomnia** ou **Postman**.

---

## 🚀 Funcionalidades Obrigatórias

### 👤 Autenticação
- Registro de usuários (`name`, `email`, `password`)
- Login e logout (usando **JWT** ou sessions)
- Proteção de rotas autenticadas com middleware

### ✅ Gerenciamento de Tarefas
- CRUD completo:
  - Criar tarefa (`title`, `description`, `due_date`, `status`)
  - Listar tarefas do usuário autenticado
  - Atualizar tarefa (somente se for dono ou tiver permissão)
  - Deletar tarefa
- Status possíveis: `pendente`, `em_andamento`, `concluida`

### 🤝 Compartilhamento de Tarefas
- Dono pode compartilhar tarefa com outro usuário
- Permissões: `read` ou `edit`
- Usuário convidado pode visualizar (e editar se tiver permissão)

### 🔍 Filtros e Buscas
- Filtrar tarefas por status
- Buscar por título ou descrição

### 🧱 Validações
- `title`: obrigatório
- `due_date`: não pode ser no passado
- `status`: deve ser um dos valores válidos
- Todos os campos devem ser validados via **Validators** do AdonisJS

---

## 🌟 Funcionalidades Opcionais (Extras)
- Upload de arquivos anexos às tarefas
- Notificação por e-mail ao compartilhar tarefa
- Paginação de resultados
- Atualizações em tempo real com **WebSockets**

---

## 🗂️ Modelagem do Banco de Dados

### **users**
| Campo | Tipo | Descrição |
|--------|------|-----------|
| id | integer | Identificador do usuário |
| name | string | Nome do usuário |
| email | string | E-mail único |
| password | string | Senha criptografada |

### **tasks**
| Campo | Tipo | Descrição |
|--------|------|-----------|
| id | integer | Identificador da tarefa |
| title | string | Título da tarefa |
| description | text | Descrição detalhada |
| due_date | date | Data limite |
| status | enum | `pendente`, `em_andamento`, `concluida` |
| user_id | integer | Dono da tarefa |

### **task_shares**
| Campo | Tipo | Descrição |
|--------|------|-----------|
| id | integer | Identificador do compartilhamento |
| task_id | integer | Referência da tarefa |
| user_id | integer | Usuário com acesso |
| permission | enum | `read` ou `edit` |

---

## ⚙️ Requisitos Técnicos
- **Node.js** v18+  
- **AdonisJS** v6+  
- Banco de dados: **SQLite**, **MySQL** ou **PostgreSQL**
- Ferramenta para testes: **Insomnia** ou **Postman**

---

## 🧩 Endpoints Principais (Exemplo)

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/register` | Cria um novo usuário |
| POST | `/login` | Autentica e retorna token |
| POST | `/logout` | Invalida o token atual |

### Tarefas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tasks` | Lista todas as tarefas do usuário |
| POST | `/tasks` | Cria uma nova tarefa |
| GET | `/tasks/:id` | Mostra detalhes de uma tarefa |
| PUT | `/tasks/:id` | Atualiza a tarefa |
| DELETE | `/tasks/:id` | Exclui a tarefa |

### Compartilhamento
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/tasks/:id/share` | Compartilha uma tarefa com outro usuário |
| GET | `/shared-tasks` | Lista tarefas compartilhadas com o usuário |

---

## 🧠 Conceitos Envolvidos
- RESTful API
- Autenticação JWT
- Validação de dados com Validators
- Relacionamentos com Lucid ORM
- Middleware de autenticação
- Estrutura MVC do AdonisJS

---

## 🧾 Exemplo de Requisição
### Criar Tarefa (`POST /tasks`)
```json
{
  "title": "Estudar AdonisJS",
  "description": "Aprender como criar APIs RESTful com Adonis",
  "due_date": "2025-10-20",
  "status": "pendente"
}

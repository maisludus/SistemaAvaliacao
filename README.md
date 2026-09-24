# Avaliações de Jogos Digitais

Aplicação MVC em Node.js para cadastrar, consultar e visualizar avaliações de jogos digitais, baseada no formulário fornecido.

## Recursos

- Campo de seleção para o jogo avaliado (inclui ArrasT-EA e a opção de informar outro jogo), sem identificação de usuário ou termo de consentimento.
- 13 perguntas de avaliação em escala de 1 a 7.
- As três perguntas abertas do formulário: benefícios, dificuldades e sugestões.
- Avaliação de usabilidade infantil do site em fluxo independente, com oito verificações de acesso, início, controles, responsividade e saída, além de observações e relatório técnico.
- Campo **Bugs** com editor de texto rico e inserção de imagens. As imagens são incorporadas ao registro, sem depender de uma pasta pública.
- Listagem cronológica e página individual de cada avaliação.
- A pergunta sobre conhecimento/uso de jogos digitais foi removida, conforme solicitado.

## Pré-requisitos

- Node.js 18 ou superior.
- MongoDB local em execução, ou uma URL de conexão do MongoDB Atlas.

## Como executar

1. Na raiz do projeto, instale as dependências:

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e ajuste `MONGODB_URI` quando necessário.

3. Inicie o MongoDB e execute:

   ```bash
   npm run dev
   ```

4. Abra `http://localhost:3000`.

O cadastro e consulta de avaliações de jogos ficam em `http://localhost:3000/avaliacoes`. A avaliação de usabilidade do site é independente e fica em `http://localhost:3000/usabilidade`.

Para produção, use `npm start`.

## Estrutura

```
config/       conexão com o MongoDB
controllers/  regras de cadastro e consulta
models/       schema Mongoose da avaliação
routes/       rotas HTTP
views/        páginas EJS e componentes compartilhados
public/       CSS e JavaScript do editor de Bugs
```

## Segurança e limite de imagens

O conteúdo HTML de Bugs é sanitizado antes de ser salvo. Como as imagens são guardadas no próprio documento como base64, o tamanho máximo aceito pelo servidor é 15 MB por envio; para imagens grandes ou muitos anexos, prefira reduzir a imagem antes de inseri-la ou evoluir o projeto para armazená-las em serviço de arquivos (por exemplo, S3/Cloudinary).

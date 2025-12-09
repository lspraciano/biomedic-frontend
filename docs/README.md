# Projeto Demonstração de IA na Saúde - Frontend

Olá!!
Primeiramente gostaria que soubesse que é uma satisfação
ter você por aqui. Este é o repositório do frontend do nosso projeto de apresentação
das possibilidades que a IA pode trazer para a área da saúde.

## ☑️ Andamento do Projeto

- Em Produção

O deploy desta aplicação foi realizando usando google cloud e está disponível
através do endereço abaixo

```
https://biomedic-frontend.lucaspraciano.com/
```

## ☄️ Versão Atual

- 0.1.0

## 🎨 Telas

1. Home
2. Detecções

### 📋 Home

Nesta tela é exibida uma mensagem que faz pontuações importantes sobre
os recursos fornecidos por essa aplicação.
![home.png](images%2Fhome.png)

Após ler a mensagem o usuário deverá clicar no botão iniciar, desta forma ele
será encaminhado para a tela de detecções.

### 📋 Detecções

Através desta tela o usuário poderá:

1. Escolher qual IA usar
2. Detecções em imagens de exemplo
3. Detecções em imagens pessoais
   ![predictions.jpg](images%2Fpredictions.jpg)

#### 1. Escolhendo o Modelo

![esco.gif](images%2Fesco.gif)

#### 2. Usando Imagens Exemplo

![imgex.gif](images%2Fimgex.gif)

#### 3. Usando Imagens Pessoais

![imagespesso.gif](images%2Fimagespesso.gif)

## 🚀 Clonando Projeto

Nesta seção, explicaremos como você pode realizar o download e
rodar o projeto em sua máquina.

### 📋 Pré-requisitos

Antes de iniciar, verifique se você atende aos seguintes pré-requisitos:

- Node 20.7.0

### 🔧 Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. Clonando o Repositório

```bash
git clone https://github.com/lspraciano/biomedic-frontend.git
```

2. No diretório raiz do projeto, instale as dependências com o comando

```bash
RUN npm install
```

3. Rode a Aplicação

```bash
RUN npm run dev
```

4. Ajustando Variáveis de Ambiente
   Para que esta aplicação possa funcionar ela realiza requisições para nossa
   API. Então vamos configurar o arquivo .env.development. Neste arquivo
   você vai encontrar a variável "VITE_API_URL". Ela deve apontar para o nosso
   backend, como o exemplo abaixo:

```
VITE_API_URL=http://localhost:8000/api/v1
```

Para acessar a documentação do backend acesse a documentação através
do link:

```
https://github.com/lspraciano/biomedic-backend
```

ou
clique [aqui](https://github.com/lspraciano/biomedic-backend) para abrir o endereço diretamente no
navegador

5. Acesse a Aplicação Local:

```
http://localhost:8001/
```

ou
clique [aqui](http://localhost:8001/) para abrir o endereço diretamente no navegador
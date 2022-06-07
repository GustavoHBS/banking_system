<h1>Banking System API</h1>
Está é uma aplicação para simular um sistema bancario, de forma mais simples. Ela é feita em node utilizando o framework nestJS e o Prisma como ORM.

<h2>Configuração</h2>
O primeiro passo é ter o node instalado na maquina, de preferencia a ultima versão 18.0 e nesse tutorial utilizaremos o yarn, mas se quiser, você pode usar o npm.
Apos isso basta clonar o repositorio na maquina e rodar o commando:
<pre>yarn</pre>
Esse comando instalara as dependencias necessárias para rodar o projeto, apos isso deve ser criado um arquivio chamado <b>.env</b> na raiz do projeto, ele terá as variaveis de ambiente que a aplicação utilizara, no caso são essas:
<pre>
DATABASE_URL=
PRIVATE_KEY=
PORT=
</pre>
O <b>DATABASE_URL</b> que será utilizado para guardar as configurações do banco, no caso nos estamos utilizando o postgresql, sendo assim o padrão para preencher esse campo é <pre>postgres://usuario:senha@endereço da base:porta/schema</pre>
O <b>PRIVATE_KEY</b> é a chave que será utilizada pra encriptografar a senha da conta(no momento está senha não é utilizada pra nada).
A <b>PORT</b> serve para você indicar em qual porta da sua maquina, a api ira utilizar para escutar as requisições, caso você não coloque nenhuma, será utilizada a porta 3000.
<h3>Start</h3>
Para iniciar o projeto é preciso buildar ele primeiro, sendo assim você pode apenas rodar um <pre>yarn build</pre> para buildar o projeto e logo depois um <pre>yarn start:prod</pre> ao fazer isso, ele criara um cliente do prisma, rodara as migrations para criar as tabelas do banco e startara a aplicação.(Caso você não queira fazer isso toda vez, basta rodar o <b> yarn start</b> que ele ira gerar o build e rodar a aplicação sozinho, sem precisar rodar as coisas do banco).

<h2>Utilizado a aplicação</h2>
Agora que a aplicação ja ta rodando, é hora de utiliza-la. Para isso acesse o <b>localhost:PORTA/api</b>, nesse link você encontrara as rotas da api, além de poder fazer a chamada delas diretamente por la. Mas caso você queira uma documentação mais bonita e legivel, você pode acessar o <b>localhost:PORTA/docs</b>, nesse link não será possivel fazer a chamada direta das rotas, mas você conseguira ler de uma maneira mais facil.

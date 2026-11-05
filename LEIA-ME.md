# Peretto Engenharia — Site Institucional V3.0

## Correção do WhatsApp (22/10/2026)

O formulário de solicitação de orçamento agora prepara uma mensagem personalizada com nome, empresa (opcional), telefone, serviço e descrição (opcional). Na primeira etapa, o visitante revisa ou edita a mensagem; na segunda, abre o WhatsApp usando um link normal, evitando bloqueios de janelas automáticas.

- Clique em "1. Preparar mensagem" depois de preencher nome, telefone e serviço.
- Revise o texto no quadro exibido.
- Clique em "2. Abrir WhatsApp com a mensagem"; a conversa será aberta com a mensagem pronta.
- O envio só ocorre quando a pessoa confirma no WhatsApp.
- Há botão para copiar a mensagem caso o dispositivo não abra o WhatsApp.
- Número configurado: +55 (67) 99130-6749. Confirme que é o número empresarial desejado.
- O site não salva os dados do formulário e não necessita de servidor nem banco de dados.

## Publicação na Cloudflare Pages

Se o site está publicado com upload direto, abra o projeto existente no painel Cloudflare Pages e faça um novo deploy em **Production** enviando o arquivo ZIP completo desta V3. Isso mantém o endereço atual.

## Observação

O arquivo HTML de prévia avulsa permite visualizar o visual e testar o formulário sem uma hospedagem. Os links dos PDFs completos funcionam na versão publicada a partir do ZIP com os arquivos de portfólio.

---

# Peretto Engenharia — Site Institucional V2 (preto e azul)

Cores principais: preto `#090D16`, azul institucional `#1B5FCF` e azul claro de destaque `#83BDFF`.

# PERETTO ENGENHARIA — Site institucional (Versão 1.0)

Site estático em HTML, CSS e JavaScript, sem banco de dados e sem custo obrigatório de hospedagem. Desenhado para desktop, tablet e celular.

## O que já está pronto

- Página inicial com proposta de valor e navegação adaptada para celulares.
- Oito serviços organizados por categorias, com filtro interativo.
- Seção institucional com responsável técnico, CREA e informações da empresa.
- Processo de atendimento e perguntas frequentes.
- Dois portfólios oficiais em PDF, com prévias e opção para visualizar/baixar.
- Formulário de orçamento que monta a mensagem e abre o WhatsApp do contato comercial.
- Links de e-mail, telefone/WhatsApp, metadados de SEO e imagem para compartilhar.
- Símbolo da marca extraído de um portfólio anterior; para fidelidade total pode ser substituído pelo arquivo original do logotipo.

## Publicação gratuita (Cloudflare Pages)

1. Acesse https://dash.cloudflare.com/ e crie uma conta gratuita ou entre em sua conta.
2. No painel, abra **Workers & Pages**, escolha **Create application** e procure a opção de **Drag and drop / Upload assets** (o nome varia conforme o painel).
3. Escolha o nome do projeto, por exemplo `peretto-engenharia` (se disponível).
4. Arraste **o arquivo ZIP** deste site ou a **pasta completa** extraída, certificando-se de que `index.html` esteja na raiz dos arquivos enviados.
5. Clique em **Deploy**. A Cloudflare fornece um endereço no padrão `nome-do-projeto.pages.dev`.
6. Teste os botões, os dois PDFs e o formulário. Se tudo estiver correto, compartilhe seu novo endereço.

Documentação oficial: https://developers.cloudflare.com/pages/get-started/direct-upload/

**Observação:** na modalidade Direct Upload, a Cloudflare informa que o projeto não pode ser convertido posteriormente para a integração Git automática; caso queira esse fluxo, crie um novo projeto. Domínio próprio (ex.: `.com.br`) pode ser conectado posteriormente, mas a compra/renovação do domínio normalmente tem custo separado.

## Google Drive: como integrar os portfólios

Os PDFs estão incluídos no pacote e funcionam sem Google Drive. Caso queira administrá-los no Drive:

1. Envie os PDFs da pasta `portfolio/` ao seu Google Drive.
2. Nas permissões de compartilhamento, use **Qualquer pessoa com o link > Leitor** para cada material que deseje tornar público.
3. No arquivo `index.html`, localize os links que começam com `portfolio/portfolio-seguranca-trabalho.pdf` e `portfolio/portfolio-manutencao-industrial.pdf`.
4. Substitua por links públicos compartilháveis do Drive. Nos links com `download`, remova o atributo `download` para evitar que o navegador salve uma página intermediária.
5. Publique novamente os arquivos na Cloudflare.

**Importante:** não compartilhe no site documentos sigilosos, laudos de clientes sem autorização, dados pessoais ou materiais internos. O Google Drive é repositório de arquivos, e a Cloudflare é responsável pela hospedagem do site.

## Como alterar o conteúdo

- **Textos/serviços/categorias:** editar `index.html` em editor de texto ou VS Code.
- **Cores, espaçamentos, layout:** editar `styles.css`. Identidade principal: azul-marinho, verde técnico e detalhes dourados.
- **Formulário, filtros e navegação:** editar `script.js`.
- **WhatsApp:** buscar `5567991306749` nos arquivos `index.html` e `script.js`.
- **E-mail:** buscar `perettoengenharias@gmail.com` em `index.html`.
- **CREA, CNPJ e responsável:** buscar os campos no `index.html` e confirmar com a documentação mais recente da empresa.
- **Logo:** substituir `assets/simbolo-peretto.png` pelo logo com transparência; adaptar o tamanho em `.brand-logo-img` no CSS.
- **Portfólios:** substituir os arquivos PDF da pasta `portfolio/`, mantendo o nome ou atualizando os links.
- **Domínio próprio:** depois de publicar, ir em **Workers & Pages > seu projeto > Custom domains**.

## Sobre o formulário

Não há backend: o site não grava, envia por e-mail ou recebe cadastros automaticamente. Os dados digitados são organizados em uma mensagem e o visitante confirma o envio no WhatsApp. O botão "copiar mensagem" é uma alternativa. Para armazenar leads ou receber pedidos por e-mail automaticamente, precisará de um serviço externo/integrado.

## Arquivos principais

```
index.html                         Site completo
styles.css                         Estilos responsivos
script.js                          Interações e formulário
assets/engenharia-estrutura.svg    Ilustração estrutural original
assets/adequacao-maquinas.svg      Ilustração NR-12 original
assets/simbolo-peretto.png         Símbolo visual do portfólio institucional
assets/capa-*.webp                 Prévia dos portfólios
assets/compartilhamento.jpg        Imagem de compartilhamento
assets/favicon.svg                 Ícone do site
portfolio/*.pdf                    PDFs institucionais
```

Criado para a Peretto Engenharia — Três Lagoas, MS — 2026.

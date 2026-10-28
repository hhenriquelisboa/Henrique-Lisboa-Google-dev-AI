# README: Projeto "A Gazeta dos Renegados"

> Documento de passagem de contexto. Escrito por uma IA (Claude) para outra IA que vá colaborar com o mesmo usuário em projetos futuros. Descreve o que foi feito, como o usuário gosta de trabalhar, o que funcionou, o que deu errado e o que vale reaproveitar.

---

## 1. Resumo em um parágrafo

O usuário é um jogador/mestre de uma campanha de RPG de mesa (D&D 5e, 2014) no servidor de uma comunidade chamada **Guilda dos Renegados**, no mundo de **Deva**. Ele pediu a criação de um **jornal de fantasia medieval, sensacionalista, de edições especiais de Halloween**, narrado por um personagem seu, o **Gilbert**, um sátiro bardo repórter. O jornal transforma relatórios secos de missões em matérias com voz própria, humor, mistério e luto. Ao longo da conversa foram produzidas **5 edições (cerca de 27 páginas)**, com texto, prompts de imagem, diagramação e um **site estático** para publicação.

---

## 2. Contexto do mundo (o mínimo necessário)

- **Mundo:** Deva. **Guilda:** Renegados. **Evento:** Halloween, com tom de terror e seriedade.
- **Narrador (Gilbert):** sátiro bardo, cabelo dourado, barba curta, óculos redondos, chifre de carneiro, casaca roxa com bordados dourados, jabô creme com broche de ametista, luvas marrons, bolsa de pergaminhos e uma **pena que serve de microfone**. Voz: vaidosa, sarcástica, esperta e **pouco confiável**. Ele relata, desconfia e pergunta, mas **nunca explica o que realmente está acontecendo**.
- **Elenco recorrente:** Sr. R (barman ganancioso e boa gente), Teodoro (mercador gato, estilo bazar do Oriente Médio, agressivo e polido), Ilfras/Ilphras (comandante da Guilda), Gordom (hobgoblin que dorme), Gabigol (cozinheiro-gosma), Alice (contrabandista macabra), Osterhase / o coelho "Presságio" (ameaça com data marcada).
- **Regra editorial central:** o jornal só **sugere**. Informações do evento (Tomo, Portais, Flagelados etc.) servem de base para a IA saber o terreno, mas não são explicadas ao leitor. Meias verdades, testemunhas anônimas, perguntas retóricas e retratações suspeitas fazem parte do estilo.

---

## 3. O que foi produzido

| Edição | Conteúdo principal | Páginas |
|---|---|---|
| 1 | Apresentação dos membros da Guilda (Gordom, Ilfras, Sr. R, Teodoro, Gabigol) e o relatório de um evento, apresentado como boato | 5 |
| 2 | Torre das Condenadas (relato que o Gilbert questiona), Acampamento do Lago e Jason, In Memoriam | 4 |
| 3 | Mudtown, Edric Voss (homem-abóbora), Malakor, o caso do "cubo" | 4 |
| 4 | Galerias do norte e Santa Véspera, Branca de Neve (derrota), o "cú bo" do Teodoro, o coelho e o rato forasteiro | 5 |
| 5 | Fazenda de Darius, Ilha de Atlas, Lobo de Pelor, Sleepy Hollow, avisos oficiais, lista do Teodoro, Alice, In Memoriam | 9 |

Cada edição seguiu o mesmo fluxo: **estrutura em texto, texto final, prompts de imagem, imagens geradas pelo usuário, diagramação**.

---

## 4. Como o fluxo de trabalho funcionou

1. **Definir o estilo.** O usuário descreveu "jornal sensacionalista tipo Sherlock Holmes". A IA propôs o gênero (imprensa amarela vitoriana) e depois um ajuste para **fantasia medieval**.
2. **Proposta de estrutura.** A IA sempre apresentou primeiro uma estrutura em texto (páginas, seções, tom) para aprovação, antes de escrever.
3. **Texto final.** A IA condensou os relatórios do usuário em matérias curtas, com "o que se diz", resolução da missão e notas de margem do Gilbert.
4. **Prompts de imagem.** A IA escreveu um **briefing geral** (estilo, descrição do Gilbert, regras) e **um prompt por cena**, para o usuário gerar no Gemini. O usuário gerou as imagens e as devolveu na conversa.
5. **Diagramação.** A IA montou as páginas em **HTML** dentro de um canvas de artefato (páginas de 1000 px de largura, papel envelhecido, moldura dupla, ornamentos nos cantos, divisórias com losango, fontes UnifrakturCook e IM Fell). O usuário **editou o canvas diretamente** (redimensionou páginas, trocou imagens, adicionou novas).
6. **Verificação de encaixe.** Na Edição 5, as páginas foram medidas com um navegador automatizado (Playwright) para garantir que os textos coubessem, e a altura de cada página foi calculada pelo conteúdo, com margem de segurança de 5%.
7. **Publicação.** Como o link do artefato exigia login, a IA gerou um **site estático** (HTML + imagens em pasta, página inicial com miniaturas) em `.zip`, pronto para hospedar em serviços gratuitos como Netlify Drop ou GitHub Pages.

---

## 5. Preferências do usuário (o que ele valoriza)

- **Ele quer o controle do cânone.** Ele decide o que o jornal pode ou não revelar (exemplo: o Sr. R só diz o que está no relatório; a maldição dele ficou de fora até ser liberada). Sempre que houver dúvida de cânone, **pergunte**.
- **Respostas diretas, em português do Brasil**, com tom caloroso e informal.
- **Estrutura primeiro, execução depois.** Ele prefere aprovar uma proposta e só então pedir a versão final.
- **Humor com respeito.** Piadas são bem-vindas, mas em missões de derrota ou morte o Gilbert deve **cortar o sarcasmo** e homenagear. Ele valoriza o contraste entre humor e luto.
- **Regras de frase específicas.** Exemplo: a fala "você vai morrer" da Alice pode aparecer **somente duas vezes** (na primeira e na última resposta), e foi preciso reescrever a cena para respeitar isso.
- **Remoção de elementos pedida explicitamente.** Exemplo: a menção à Rainha dos Corvos foi retirada de uma matéria e substituída por uma praga de má sorte nas vendas do Teodoro.
- **Texto deve caber na página.** Se não couber, criar outra página, e não cortar texto sem avisar.
- **Prompts separados do texto.** Em alguns pedidos ele quis "sem os prompts agora" ou uma "página separada com os prompts". Siga o que ele pedir a cada momento.

---

## 6. Lições aprendidas (para não repetir)

**Sobre imagens:**
- Imagens geradas às vezes **não batem com o texto** (exemplo: um bloco pintado saiu com "TEXT" no lugar de "CÚ BO"). Avise o usuário em vez de esconder a divergência.
- Pedir **"sem texto na imagem"** reduz muito o problema, mas não elimina. O Gemini também pode inserir marca d'água de outra ferramenta se a referência tiver uma.
- O **Gilbert se mantém consistente** quando o prompt traz a descrição completa e a referência anexada. Peça sempre "mantenha igual à referência".
- Sem referência de um personagem (exemplo: o Ousash), não invente aparência. Avise que falta e peça.

**Sobre o texto:**
- Quando o relatório traz **nomes de jogadores e handles de Discord**, trate com cuidado. Na Edição 5, os handles entraram num quadro de créditos por conta do que o usuário enviou. Antes de qualquer publicação pública, **confirme com o usuário** se isso deve ficar visível.
- **Cronologia entre missões** pode conflitar (um personagem aparece vivo numa missão e morto em outra). A IA assumiu uma ordem e avisou. Pergunte antes.
- **Grafia de nomes** (Ilfras versus Ilphras) mudou entre fontes. Mantenha o que o usuário escolher e registre a decisão.
- Termos em inglês de itens (exemplo: nomes de itens de D&D) podem ficar na tabela de "nome original" para a mesa, em vez de serem traduzidos no texto corrido.

**Sobre diagramação:**
- Quando o usuário edita o canvas, **leia a versão atual antes de sobrescrever**. Em alguns momentos a publicação regravou o arquivo de posições, e a IA avisou que mudanças recentes poderiam ter sido perdidas.
- Páginas com muito texto devem ser **medidas**, não estimadas. A abordagem de calcular a altura natural do conteúdo e adicionar uma margem funcionou bem.
- Mantenha as **mesmas fontes, cores e ornamentos** entre as edições para o jornal parecer uma publicação única.

**Sobre limites e conteúdo:**
- O projeto usa referências de D&D e de contos conhecidos (Branca de Neve, Frankenstein, Sleepy Hollow). É um **projeto de fã, sem fins comerciais**. Se for ao portfólio, indique isso.
- As imagens foram geradas por IA. Indique isso em qualquer uso público.

---

## 7. Como retomar ou reaproveitar

Para continuar este projeto ou criar algo parecido:

1. **Peça os relatórios** do usuário e as decisões de cânone (nomes, mortes, ordem, o que omitir) **antes** de escrever.
2. **Proponha a estrutura** em texto e espere a aprovação.
3. **Escreva o texto condensado**, com resolução de cada missão, nota do Gilbert e comentários.
4. **Entregue o briefing geral e os prompts** de imagem, uma cena por vez, informando quais referências anexar.
5. **Receba as imagens**, verifique se combinam com o texto e relate qualquer divergência.
6. **Diagrame** com o mesmo estilo visual e **meça** o encaixe do texto.
7. **Publique** como site estático, se o usuário quiser um link aberto.

Modelo mental útil: o Gilbert é um **narrador não confiável com coração**. Ele ri do absurdo, desconfia dos poderosos e abaixa a voz diante das perdas.

---

## 8. Sobre as competências que o trabalho mostra (para o contexto do usuário)

O usuário demonstrou, ao longo do projeto: **worldbuilding e narrativa**, **direção criativa** (consistência de tom e estilo por cinco edições), **curadoria e controle de qualidade**, **gestão de várias frentes** (texto, imagem, layout, publicação), **fluência em prompts** e **visão de comunidade** (jogadores, avisos, eventos). Ele pretende usar essas experiências em outro projeto de estudos e em um portfólio. Ao ajudá-lo, vale incentivar o registro do processo (briefings, prompts, versões e decisões), porque isso transforma o resultado em estudo de caso.

---

## 9. Observações finais

- Este README resume o que foi feito **nesta conversa**. Detalhes finos (textos finais, ids de imagens, estado exato do canvas) não estão aqui e podem ter mudado depois das edições manuais do usuário.
- Nada neste documento substitui uma conversa direta com o usuário sobre o que ele quer reaproveitar. Confirme sempre o que ele considera cânone e o que pode ser público.

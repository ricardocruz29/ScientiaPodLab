import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Help() {
  useAuthRedirect();
  useChangeActiveSidebar("help");

  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: "40px" }}>
        Ajuda - Podcasts Comunicação de Ciência
      </Typography>

      {/* Introdução */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Introdução</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            A Comunicação de Ciência é um campo com grande importância na
            sociedade atual, partilhando informações e descobertas científicas,
            de cientistas para a população, contribuindo para a disseminação de
            informação e conhecimento. Assim, é fundamental que a ciência
            alcance o maior número de pessoas. Atualmente, existem diversos
            canais de comunicação disponíveis, que possibilitam a transmissão da
            ciência em diferentes formatos. Com a evolução da tecnologia,
            prevê-se que haja um aumento na diversidade de tipologias de meios
            de comunicação e, dessa forma, é necessária uma adaptação aos
            diferentes meios de comunicação para alcançar o maior número de
            pessoas.
          </Typography>
          <Typography paragraph>
            Os podcasts são um meio de comunicação que na última década tem
            ganho popularidade na sociedade e que tem alcançado cada vez mais
            pessoas. Contudo, além da importância de selecionar um meio de
            comunicação adequado que permita alcançar o maior número de pessoas,
            é de igual importância garantir que o meio escolhido permita a
            criação de conteúdo de forma acessível pelos cientistas. Neste
            sentido, apesar de os podcasts serem cada vez mais fáceis de
            produzir, ainda requerem alguma literacia tecnológica.
            Consequentemente, existe a possibilidade de este meio de comunicação
            não ser acessível para os cientistas criarem conteúdo.
          </Typography>
          <Typography paragraph>
            Considerando este problema, surgiu o ScientiaPodLab, uma plataforma
            unificadora para a criação de podcasts de comunicação de ciência.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Comunicação de Ciência */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Comunicação de Ciência</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            O conceito de comunicação pode ser definido de forma simples, como a
            transferência de informação de um sujeito A para um sujeito B.
            Consequentemente, a comunicação de ciência é frequentemente vista
            como a transferência de informação científica do sujeito A, um
            cientista, para um sujeito B, o público.
          </Typography>
          <Typography paragraph>
            Existem três razões principais que levam os cientistas à realização
            de comunicação de ciência: Porque têm de o fazer, porque querem e
            porque devem. Têm de o fazer porque muito dos fundos da investigação
            científica resultam das taxas pagas pela sociedade. A sociedade
            interessa-se pelos descobrimentos e pelos falhanços desta elite.
          </Typography>
          <Typography paragraph>
            Querem-no fazer porque gostam da ciência e, consequentemente, gostam
            de falar com pessoas, não apenas cientistas, mas também com amigos,
            família e quem esteja interessado em ouvir. Devem-no fazer porque
            enquanto cientistas, têm a responsabilidade de questionar argumentos
            não provados. Ao fazerem-no, ensinam os cidadãos a questionar aquilo
            que veem.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Podcasts */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Podcasts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Um podcast é um conteúdo de áudio episódico, que pode ser baixado ou
            transmitido, principalmente falado, distribuído pela internet, que
            pode ser reproduzido em qualquer lugar, a qualquer momento,
            produzido por qualquer pessoa que assim o deseje. Os podcasts
            possuem benefícios que são comuns a todos os meios de comunicação de
            áudio. Um dos principais benefícios é a possibilidade de consumir
            conteúdo de forma passiva, ou seja, é possível ouvir podcasts
            enquanto se realiza outras atividades.
          </Typography>
          <Typography paragraph>
            Os podcasts, como formato de interação online, proporcionam a
            flexibilidade na criação de conteúdo próprio, algo que não é
            possível na rádio, em que o conteúdo publicado é controlado pela
            própria entidade.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* As Etapas de Criação de um Podcast */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            As Etapas de Criação de um Podcast
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Embora a ideia de que a criação de um podcast é uma tarefa fácil,
            ser transmitida à sociedade por plataformas de criação de podcasts,
            é importante analisar o contexto e o objetivo do podcast.
          </Typography>
          <Typography paragraph>
            A criação de um podcast cujo objetivo é passar o tempo e, a criação
            de um podcast de comunicação de ciência representam dois processos
            completamente diferentes a nível de complexidade e,
            consequentemente, podemos estar perante uma tarefa árdua que não é
            acessível a todos.
          </Typography>
          <Typography paragraph>
            A criação de um podcast pode ser desmembrada em cinco pilares:
          </Typography>
          <Typography component="ul" style={{ marginLeft: "24px" }}>
            <li>Planeamento</li>
            <li>Organização dos episódios</li>
            <li>Equipamento e Gravação</li>
            <li>Edição e Produção</li>
            <li>Publicação e Promoção</li>
          </Typography>
          <Typography paragraph>
            Antes da gravação do podcast em si, existem duas etapas muito
            importantes: o planeamento e a organização dos episódios.
          </Typography>
          <Typography paragraph>
            Na fase de planeamento, primeiramente, é importante definir o
            objetivo do podcast e o público que se pretende atingir. De seguida,
            é importante pensar no título do podcast e na descrição, considerada
            a parte mais importante na decisão de ouvir um novo podcast
          </Typography>
          <Typography paragraph>
            Na fase de organização dos episódios, a primeira pergunta que
            devemos colocar é acerca da duração dos episódios.
          </Typography>
          <Typography paragraph>
            De seguida, é importante pensar no título e no formato do episódio.
            Depois destas duas fases concluídas é que a fase de gravação começa.
            Em primeiro lugar é importante criar um guião, seja este mais
            exaustivo ou mais livre.
          </Typography>
          <Typography paragraph>
            De seguida, é necessário pensar na questão do hardware e do software
            a utilizar para a gravação do podcast. Esta decisão é importante
            para alcançar uma boa qualidade de áudio, algo muito importante na
            comunicação através do formato de áudio
          </Typography>
          <Typography paragraph>
            Finalmente, depois de todo o pré-planeamento concluído, é que se
            deve proceder à gravação do áudio
          </Typography>
          <Typography paragraph>
            Com a gravação concluída, realiza-se a fase de edição e produção do
            episódio. Finalmente, com o episódio editado, chega-se à última fase
            de criação de um podcast, a publicação e promoção, que envolve a
            escolha de uma plataforma de hosting de podcasts e a submissão para
            diretórios de podcasts como o Spotify, Apple Podcasts e Google
            Podcasts.
          </Typography>
          <Typography paragraph>
            Em suma, à criação de um podcast estão inerentes várias etapas. A
            ideia de os podcasts serem de fácil de criação pode não ser
            totalmente verdade tendo em conta o tipo de conteúdo, o formato
            escolhido e a literacia tecnológica do utilizador. No contexto da
            comunicação de ciência através do formato podcast, para além da
            dificuldade inerente à comunicação de ciência, surge também a
            dificuldade de criação de um podcast.
          </Typography>
          {/* Mais conteúdo aqui */}
        </AccordionDetails>
      </Accordion>

      {/* Dicas para um melhor Podcast de Comunicação de Ciência */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Dicas para um melhor Podcast de Comunicação de Ciência
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            A utilização de podcasts como meio de comunicação de ciência é uma
            potencial solução para atenuar o problema de cada vez ser mais
            difícil transmitires a tua mensagem científica e para atraíres o
            público para que a ouça.
          </Typography>
          <Typography paragraph>
            Aspetos como o uso do entretenimento e qualidade de produção, são
            fundamentais para a decisão de continuar a ouvir um podcast. Isso
            aplica-se tanto aos podcasts em geral quanto aos podcasts de
            comunicação de ciência.
          </Typography>
          <Typography paragraph>
            É importante fazermos a generalização da ciência a um público mais
            geral, através de, por exemplo:
          </Typography>
          <Typography component="ul" style={{ marginLeft: "24px" }}>
            <li>Usar termos simples;</li>
            <li>Evitar utilizar linguagem sofisticada e frases complexas;</li>
            <li>Não exagerar nas implicações;</li>
            <li>
              Incluir todas as descobertas essenciais para ajudar os leitores a
              perceber o artigo;
            </li>
          </Typography>
          <Typography paragraph>
            Quem é o público que pretendemos atingir & Qual o nosso objetivo
            enquanto locutores. Estas devem ser as duas primeiras perguntas que
            nos colocamos. Algo muito importante, independente do público que
            pretendemos atingir é o rigor científico. Não devemos nunca evitar o
            rigor só para nos facilitar a vida enquanto comunicadores. Devemos é
            simplificar a mensagem mais ou menos dependendo do nosso público e
            do nosso objetivo, contudo, nunca perdendo o rigor científico. Isto
            é, podemos passar a mensagem com maior ou menor densidade. Por
            vezes, simplificar demais pode desvirtuar o conteúdo numa tentativa
            de chegarmos a um público maior.
          </Typography>
          <Typography paragraph>
            Para mantermos este rigor, os termos devem ser desconstruídos e
            explicados. Devem ser explicados de forma que sejam fáceis de
            perceber, utilizando metáforas, analogias, ou simplesmente dando
            exemplos da sua aplicação na sociedade. Mostrar às pessoas como é
            que as coisas realmente são. Não explicar apenas os conceitos.
          </Typography>
          <Typography paragraph>
            Contudo, mais uma vez depende do público. Uma informação muito densa
            e complexa chega aos que realmente estão interessados no assunto.
            Informa, sensibiliza e atinge o objetivo. Contudo, pode afastar
            algum público, mas tem a vantagem de atrair e esclarecer aqueles que
            estão realmente interessados. Aqui é crucial responder-mos às 2
            perguntas iniciais. O equilíbrio pode estar na identificação da
            audiência, na adaptação da mensagem e na gestão da duração.
          </Typography>
          <Typography component="ul" style={{ marginLeft: "24px" }}>
            <li>
              Uma mensagem com a duração mais longa do que necessita torna-se
              massuda. Para público informado, técnico e específico, pode-se
              estender entre 30 minutos e uma hora.
            </li>
            <li>
              Para público menos informado, onde pretendemos apenas despertar a
              curiosidade e interesse, a mensagem tem de ser mais curta. Algo
              mais generalista, para despoletar interesse seria algo entre 3-5
              minutos. Contudo, pode-se puxar mais algum tempo, dependendo
              também da qualidade e do possível interesse do público.
            </li>
          </Typography>
          <Typography paragraph>
            Por um lado é difícil os cientistas serem cativados a fazer
            comunicação de ciência, estamos perante uma sociedade cada vez mais
            formulada e alterada. É cada vez mais difícil chegar a um público.
            Temos de nos adaptar aos meios. Em 2, 3 segundos perde-se a atenção
            das pessoas. Adapta-te ou perrish. Tivemos de adaptar a televisão ao
            online, a rádio aos podcasts. Eventualmente, a forma como a
            comunicação de ciência é feita atualmente terá de ser adaptada. Em
            alguns segundos, no nosso podcast temos de lhes captar a atenção. Um
            ponto positivo dos podcasts é a sua versatilidade. Fazer um podcast
            mais longo, e coabitar com os reels/tiktoks com excertos que poderão
            ser passados para lá. Ou mesmo podcasts curtos que despoletam a
            curiosidade e depois ter um podcast mais longo.
          </Typography>
          <Typography paragraph>
            Os podcasts mais ouvidos, são de comédia, e isso representa a
            procura pela descontração por parte das pessoas. A Ciência nesse
            caso pode ser difícil de conjugar e consequentemente, de chegar as
            pessoas. É difícil introduzir comédia na ciência porque pode tirar
            credibilidade. Demasiado simples, pode afetar a credibilidade. As
            pessoas querem cada vez mais conteúdo rápido. Contudo, ter em
            atenção que a saturação acontece, aconteceu em relação aos vídeos.
            Houve sobre-utilização. Um profissional de comunicação de ciência
            procura pelos formatos mais adequados ao atual. Apostar no podcast,
            pode ser a solução que faz mais sentido ou como complementar para
            meio de comunicação de ciência. É mais prático de ser utilizado. Os
            tiktoks podem ser o futuro, mas os podcasts atualmente ainda são uma
            boa proposta. Os podcasts têm ainda uma longa longevidade, antes
            deles ainda vão cair outros formatos tradicionais.
          </Typography>
          <Typography paragraph>
            Resumindo, aqui seguem algumas dicas muito importantes:
          </Typography>
          <Typography component="ul" style={{ marginLeft: "24px" }}>
            <li>
              Versatilidade da mensagem. O público-alvo pode não ser exatamente
              aquele que atingimos. A nossa mensagem tem de ser versátil. O
              ritmo de mensagem, tom de mensagem, duração, tem de ser adaptado
              ao diferente público.
            </li>
            <li>
              É importante perceber o público, perceber o que é que eles querem
              ouvir. Envolvê-los de alguma forma, mas seria interessante as
              pessoas sentirem-se como voz ativa.
            </li>
            <li>
              A comédia pode ser muito vantajosa, contudo, tem de se ter cuidado
              com a forma como é utilizada para não tirar o rigor científico da
              mensagem. É difícil introduzir comédia inteligente nas coisas, não
              pode ser uma coisa à toa.
            </li>
            <li>Não abdicar do trabalho de pesquisa.</li>
            <li>
              Confiança do que estamos a comunicar. Temos de passar a ideia que
              somos especialistas. A nível da voz, a confiança é chave, e o
              podcast é apenas a voz. Se pensarmos noutros mundos, num palco
              televisivo, mesmo a roupa que estamos a usar e os nossos gestos e
              a confiança que passamos afetam a credibilidade da mensagem.
            </li>
            <li>
              Ter carisma e presença, e são aspetos que apesar do que se pensa
              se pode trabalhar. A voz pode ser trabalhada.
            </li>
            <li>
              Não ser condescendente. Não o podemos ser enquanto locutores. A
              partir do momento que somos, as pessoas vão-se desligar porque
              vão-se sentir inferiorizadas. Quando explicamos as coisas, mesmo
              quando aproximamos a linguagem à forma como a pessoa possa
              perceber, não o podemos fazer de forma condescendente. Analogias e
              metáforas ajudam a evitar isto.
            </li>
            <li>
              Devemos aproximar-nos do público, i.e, utilizar linguagem próxima
              ("tu" por exemplo). Linguagem jovem, próxima, quase que a falar
              com colegas e amigos invés de estarmos a falar com um público mais
              afastado.
            </li>
            <li>
              Tentar pormo-nos no lugar da pessoa para quem vamos falar, e
              perceber o que é que eles querem saber a nível científico e para a
              sociedade.
            </li>
            <li>
              Dar exemplos reais da ciência na sociedade para perspectivar e dar
              contexto ao espectador.
            </li>
            <li>
              Crianças → Ritmo lento, mensagem mais dinâmica, discurso pouco
              técnico. Jovens Adultos & adultos → Ritmo mais rápido, são o
              público mais instruído, discurso mais técnico. Idosos → Semelhante
              às crianças, na mensagem que é passada, mas cuidado com a forma
              como a mensagem é passada. Não se querem sentir desvalorizados e
              ser tratados como ignorantes.
            </li>
            <li>
              Rigor científico é sempre importante, contudo, a mensagem pode ser
              transmitida com maior ou menor densidade (Ser mais fácil ou mais
              difícil de entender).
            </li>
            <li>
              Para público informado e técnico, a duração pode estender-se até a
              1 hora. A densidade da informação pode aumentar consideravelmente.
            </li>
            <li>
              Para um público mais desinformado, onde pretendemos apenas
              despertar a curiosidade e interesse, devemos procurar durações
              mais curtas, com o máximo de 30 minutos.
            </li>
            <li>Para crianças, coisas muito curtas.</li>
            <li>
              Independentemente do público, tentar encurtar a mensagem é sempre
              um bom exercício.
            </li>
            <li>
              Usar termos técnicos é bom, contudo, estes termos devem ser
              desconstruídos e explicados. Explicados de uma forma que sejam
              fáceis de perceber. Utilizar metáforas, analogias, ou simplesmente
              dando exemplos da sua aplicação na sociedade, fazendo a sua
              contextualização.
            </li>
            <li>Usar linguagem informal, contudo, clara e objetiva.</li>
            <li>
              Para avaliar se a nossa mensagem vai ser percebida, pode ser bom
              tentar fazer um exercício que é passar a mensagem a alguém mais
              velho. Se eles perceberem, possivelmente a mensagem está a ser
              eficaz.
            </li>
            <li>
              A duração não pode ser muito longa. Os podcasts são mais
              consumidos quando estamos a fazer alguma tarefa, passear, viajar,
              quando nos apetece. Um podcast não pode ser demasiado longo,
              porque ou é muito cativante ou as pessoas perdem o interesse.
            </li>
            <li>
              Definir o público-alvo é extremamente importante. O tipo de
              discurso, o ritmo, estrutura, basicamente todos os aspetos vão
              mudar face ao tipo de público.
            </li>
            <li>
              A inclusão de jingles, músicas de fundo e separadores não só não
              afetam no rigor da mensagem, como foram vistos como fatores muito
              importantes para a comunicação de ciência através do formato de
              podcast. Os especialistas defendem que sobretudo para gerações
              mais novas, existe muita dificuldade em captar a sua atenção.
              Estes efeitos sonoros podem ser aspetos que ajudam nessa vertente.
              Adicionalmente, podem conferir identidade e criatividade ao
              podcast.
            </li>
          </Typography>
          <Typography paragraph>Alguns Alertas e Preocupações</Typography>
          <Typography component="ul" style={{ marginLeft: "24px" }}>
            <li>
              O público-alvo pensado pode não ser exatamente aquele que
              atingimos. A nossa mensagem tem de ser versátil.
            </li>
            <li>
              O ritmo de mensagem, tom de mensagem, duração, tem de ser adaptado
              ao diferente público.
            </li>
            <li>
              Cuidado ao desvirtuar o demais o conteúdo numa tentativa de
              chegarmos a um público maior. Pode criar uma espécie de falsa
              ilusão de ficar informado ao ouvinte. Manter o rigor é muito
              importante.
            </li>
            <li>
              Uma informação muito densa e complexa chega aos que realmente
              estão interessados no assunto, informando, sensibilizando e atinge
              o objetivo. Contudo, pode afastar algum público.
            </li>
            <li>
              Deve-se evitar o uso de jargão, não tentando simplificar demasiado
              as coisas.
            </li>
            <li>
              A comédia é bastante utilizada, contudo, deve-se ter cuidado na
              forma como se utiliza. Não deve tirar o rigor científico.
            </li>
            <li>
              Não abdicar do trabalho de pesquisa. É muito importante para a
              forma como vamos passar a mensagem. Quanto mais soubermos de um
              assunto, mais facilmente comunicamos acerca dele.
            </li>
            <li>
              Não ser condescendente, i.e, não fazer sentir as pessoas burras ou
              inferiorizadas. A partir do momento que o fazemos, perdemos o
              público.
            </li>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Estruturas de Podcast */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Estruturas de Podcast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            <strong>
              Tipos de estruturas e as suas vantagens e desvantagens:
            </strong>
          </Typography>
          <Typography component="ul" style={{ marginLeft: "24px" }}>
            <li>
              Entrevista pode ajudar para quem não tem o background científico
              para fazer sozinho. Fazer a orientação para que os convidados
              toquem em certos pontos.
            </li>
            <li>
              Na entrevista, o locutor pode ser alguém mais ligado à área de
              comunicação, que irá entrevistar um investigador/cientista. Guia a
              entrevista e “corrige” ou ajuda a desmembrar a comunicação feita
              por alguém que talvez não esteja tão habituado a fazê-lo.
            </li>
            <li>
              Monólogo pode ser arriscado porque ou fazemos algo criativo e
              inovador ou então sente-se falta da presença do espetador. Quando
              falamos sobre a nossa própria área, perdemos a noção do que é que
              o público sabe.
            </li>
            <li>
              No monólogo, preparar ao máximo a mensagem antes de começar a
              falar. Para cientistas que não sejam da área, este método é um
              bocado perigoso.
            </li>
            <li>
              Storytelling aliado com efeitos sonoros pode conferir uma maior
              imersão ao ouvinte.
            </li>
          </Typography>
          <Typography paragraph></Typography>
          <Typography paragraph>
            Relativamente à estrutura, o monólogo foi identificado como um risco
            porque ou se faz algo muito criativo ou inovador ou então pode-se
            senti falta da presença do espetador. Quando falamos sobre a nossa
            própria área, perdemos a noção do que é que o público sabe. A
            entrevista neste contexto pode ser melhor, uma vez que pode juntar o
            melhor de dois mundos. Alguém especialista na área científica, e
            alguém com experiência em comunicação/jornalismo. Quando quisermos
            incluir na estrutura alguém da área de comunicação que entrevista um
            investigador/cientista, acho que ele por si só irá conseguir guiar a
            entrevista e “corrigir” o cientista na comunicação.{" "}
          </Typography>
          <Typography paragraph>
            A estrutura que escolhes é dinâmica/versátil, e pode incluir mais do
            que uma destas "estruturas" clássicas. Tem apenas em atenção algumas
            dicas relativamente à estrutura:
          </Typography>
          <Typography paragraph>
            <strong>Introdução - </strong>Para um podcast mais dinâmico,
            apresenta-te de forma informal, e utiliza efeitos sonoros, música de
            fundo, jingles, etc. Caso tenhas convidados, apresenta-os e
            contextualiza a importância deles. Ainda na introdução, apresenta o
            teu conteúdo. Faz-lo de forma dinâmica para apanhar a atenção dos
            ouvintes. Se o teu objetivo for algo mais curto, secalhar a
            introdução pode passar apenas pela passagem de uma música e um
            slogan, não precisando de te apresentares.
          </Typography>
          <Typography paragraph>
            <strong>Comunicação - </strong>Existem muitas estruturas possíveis
            para fazer o teu podcast. Escolhe a que se adequa melhor. Apesar de
            não ser necessário manteres sempre a mesma estrutura nos episódios
            do teu podcast, é comum usar apenas 1 ou 2 estruturas. Adequa o teu
            tipo de discurso ao teu público alvo e também aos teus convidados.
            Para uma comunicação melhor, tenta falar com um ritmo mais lento. É
            importante para haver clareza no discurso na comunicação de ciência.
            Dá exemplos do que estás a falar se for algo menos comum e que o teu
            público possa não perceber.
          </Typography>
          <Typography paragraph>
            <strong>Conteúdo - </strong>Credibiliza o conteúdo que transmites no
            teu podcast. Através da fundamentação de onde retiras essa
            informação (Seja através de livros, artigos, conhecimento próprio,
            especialistas externos)
          </Typography>
          <Typography paragraph>
            <strong>Elementos Adicionais - </strong> Já pensaste em criar o teu
            slogan? Pode ser um bom branding para o teu podcast. Faz uso de
            músicas de fundo para dinamizar o teu podcast e emergir o ouvinte.
            Contudo, cuidado para esta não se sobrepor à voz. Pode ser um bom
            exemplo utilizares em momentos como a intro, a outro, ou em pausas
            durante o episódio. O mesmo caso para os efeitos sonoros. Pode ser
            importante para introduzir dinâmica ao teu podcast. Escolhe os
            momentos certos para os utilizar.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Help;

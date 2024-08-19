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
            ciência em diferentes formatos.
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
            unificadora para a criação de podcasts de comunicação de ciência. Lê
            os capítulos seguintes para que consigamos ajudar ao máximo!
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Comunicação de Ciência */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            O que significa Comunicação de Ciência?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            A Comunicação de Ciência foca-se na capacidade de partilhar
            informação científica entre os cientistas ou detentores de
            informação científica e o público em geral.
          </Typography>
          <Typography paragraph>
            Existem três razões principais que levam os cientistas à realização
            de comunicação de ciência:{" "}
            <strong>
              Porque têm de o fazer, porque querem e porque devem.
            </strong>
          </Typography>
          <Typography paragraph>
            <strong>Têm de o fazer</strong> porque muitos dos fundos da
            investigação científica resultam dos impostos pagos pela sociedade.
            A sociedade interessa-se pelos avanços e progressos da ciência.
          </Typography>
          <Typography paragraph>
            <strong>Querem-no fazer</strong> porque gostam da ciência e,
            consequentemente, gostam de partilhar com as pessoas, não apenas
            cientistas, mas também com amigos, família e quem esteja interessado
            em ouvir.
          </Typography>
          <Typography paragraph>
            <strong>Devem-no fazer</strong> porque enquanto cientistas, têm a
            responsabilidade de questionar argumentos não provados. Ao
            fazerem-no, ensinam os cidadãos a questionar aquilo que veem.
          </Typography>
          <Typography paragraph></Typography>
          <Typography paragraph>
            Com isto, não queremos de todo fazer-te sentir que tenhas de fazer
            um podcast! Apenas estamos aqui para te encorajar e para te
            ajudarmos! Uma sociedade onde haja uma maior Comunicação de Ciência
            é benéfica para todos. Sabemos que é um processo muito difícil, e
            por isso estamos aqui para te facilitar o trabalho ao máximo!
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Podcasts */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Como fazer um Podcast?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Um podcast é um conteúdo de áudio episódico, principalmente falado,
            distribuído pela internet, que pode ser descarregado ou transmitido,
            e que pode ser reproduzido em qualquer lugar, a qualquer momento. Os
            podcasts possuem benefícios que são comuns a todos os meios de
            comunicação de áudio. Um dos principais benefícios é o facto de
            permitirem o seu consumo de forma passiva, ou seja, é possível ouvir
            podcasts enquanto se realizam outras atividades.
          </Typography>
          <Typography paragraph>
            Os podcasts, como formato de publicação online, proporcionam a
            flexibilidade na criação de conteúdo próprio, algo que não é
            possível na rádio, em que o conteúdo publicado é controlado pela
            própria entidade.
          </Typography>
          <Typography paragraph>
            <strong>As Etapas de Criação de um Podcast</strong>
          </Typography>
          <Typography paragraph>
            A criação de um podcast de entretenimento ou a criação de um podcast
            de comunicação de ciência representam dois processos completamente
            diferentes a nível de complexidade. Mas não desistas já, estamos
            aqui para te ajudar :)
          </Typography>
          <Typography paragraph>
            A criação de um podcast implica considerar cinco pilares:
          </Typography>
          <Typography paragraph component="ul" style={{ marginLeft: "24px" }}>
            <li>Planeamento</li>
            <li>Organização dos episódios</li>
            <li>Equipamento e Gravação</li>
            <li>Edição e Produção</li>
            <li>Publicação e Promoção</li>
          </Typography>
          <Typography paragraph>
            Antes da gravação do podcast em si, existem duas etapas muito
            importantes:{" "}
            <strong>o planeamento e a organização dos episódios.</strong>
          </Typography>
          <Typography paragraph>
            Na fase de <strong>planeamento</strong>, primeiramente, é importante
            definir o objetivo do podcast e o público que se pretende atingir.
            Pensa também no título e na descrição do podcast, e leva o tempo que
            precisares. O título e a descrição são muitas vezes aquilo que
            convence um ouvinte a ouvir o teu podcast!
          </Typography>
          <Typography paragraph>
            Na fase de <strong>organização dos episódios</strong>, a primeira
            pergunta que devemos colocar é a duração dos episódios, e a partir
            daí escolheres uma estrutura para o teu podcast que corresponda ao
            objetivo e ao público do teu podcast.
          </Typography>

          <Typography paragraph>
            <strong>
              Tipos de estruturas e as suas vantagens e desvantagens:
            </strong>
          </Typography>
          <Typography paragraph component="ul" style={{ marginLeft: "24px" }}>
            <li>
              <strong>Entrevista: </strong>pode ajudar quem não tem o background
              científico para fazer sozinho. Fazer a orientação para que os
              convidados abordem determinados assuntos.
            </li>
            <li>
              Na entrevista, o locutor pode ser alguém ligado à área de
              comunicação, que irá entrevistar um investigador/cientista. Guia a
              entrevista e “corrige” ou ajuda a descomplicar a comunicação feita
              por alguém que talvez não esteja tão habituado a fazê-lo.
            </li>
            <li>
              <strong>Monólogo: </strong>pode ser arriscado porque ou fazemos
              algo criativo e inovador ou então sentimos falta da presença do
              ouvinte. Quando falamos sobre a nossa própria área, perdemos a
              noção do que é que o público sabe.
            </li>
            <li>
              No monólogo, preparar ao máximo a mensagem antes de começar a
              falar. Para cientistas que não sejam da área da comunicação, este
              método poderá ser mais desafiante.
            </li>
            <li>
              <strong>Storytelling </strong> alido com efeitos sonoros pode
              conferir uma maior imersão ao ouvinte.
            </li>
          </Typography>
          <Typography paragraph></Typography>
          <Typography paragraph>
            Relativamente à estrutura, o formato de monólogo apresenta alguns
            riscos porque o apresentador pode desligar-se da sua audiência.
            Quando falamos sobre a nossa própria área, perdemos a noção do que é
            que o público sabe. A entrevista neste contexto pode ser melhor, .
            permitindo, por exemplo, juntar alguém especialista na área
            científica, e alguém com experiência em comunicação/jornalismo que
            guiará a conversa e garantirá a eficiência da mensagem.
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
            teu conteúdo. Fa-lo de forma dinâmica para captar a atenção dos
            ouvintes. Se o teu objetivo for algo mais curto, a introdução pode
            passar apenas por uma música e um slogan, não precisando de te
            apresentares.
          </Typography>
          <Typography paragraph>
            <strong>Comunicação - </strong>Existem muitas estruturas possíveis
            para fazer o teu podcast. Escolhe a que se adequa melhor. Apesar de
            não ser necessário mantermos sempre a mesma estrutura nos episódios
            do teu podcast, é comum usar apenas 1 ou 2 estruturas. Adequa o teu
            tipo de discurso ao teu público alvo e também aos teus convidados.
            Para uma melhor comunicação, tenta falar com um ritmo mais lento. É
            importante haver clareza no discurso na comunicação de ciência. Dá
            exemplos do que estás a falar se for algo menos comum e que o teu
            público possa não perceber.
          </Typography>
          <Typography paragraph>
            <strong>Conteúdo - </strong>Credibiliza o conteúdo que transmites no
            teu podcast apresentando as fontes da informação (Seja através de
            livros, artigos, conhecimento próprio, especialistas externos).
          </Typography>
          <Typography paragraph>
            <strong>Elementos Adicionais - </strong> Já pensaste em criar o teu
            slogan? Pode ser um bom branding para o teu podcast. Faz uso de
            músicas de fundo para dinamizar o teu podcast. Contudo, cuidado para
            não se sobrepor à voz. Pode ser uma boa prática utilizares em
            momentos como a intro, a outro, ou em pausas durante o episódio. O
            mesmo caso para os efeitos sonoros. Pode ser importante para
            introduzir dinâmica ao teu podcast. Escolhe os momentos certos para
            os utilizar.
          </Typography>

          <Typography paragraph>
            Depois destas duas fases estarem concluídas é que devemos começar a
            pensar na fase de gravação. Começa por criar um guião, seja este
            mais exaustivo ou mais livre, e inspira-te nos templates que te
            oferecemos. Podes a qualquer momento criar novos templates para que
            eles se adequem ao que pretendes atingir com o episódio.
          </Typography>
          <Typography paragraph>
            E não te esqueças também da questão do equipamento de gravação!
            Tendo em conta os teus recursos e objetivo, a decisão pode passar
            entre gravar com um telemóvel, ou então fazeres algum investimento
            em equipamento de gravação de qualidade. É uma decisão que tens de
            avaliar, mas um bom áudio a longo prazo é um fator bastante
            importante!
          </Typography>
          <Typography paragraph>
            Tens isso tudo pensado? Vamos passar à gravação! Aqui na plataforma
            tentamos fazer com que este processo seja o mais intuitivo possível.
            Escolhe um template, e vais preenchendo os segmentos! Se a meio
            tiveres alguma dúvida, não hesites em voltar a trás e vir ler esta
            informação novamente! Nós vamos guardando o teu episódio, e podes
            retomar a gravação sempre que queiras.
          </Typography>
          <Typography paragraph>
            Finalmente, com o episódio gravado, chega-se à última fase de
            criação de um podcast, a sua <strong>publicação</strong>. Pode
            parecer complexo mas vamos ajudar a simplificar.
          </Typography>
          <Typography paragraph>
            Começa por escolher os diretórios de podcasts onde pretendes listar
            o teu podcast. Alguns exemplos dos diretórios mais conhecidos são o
            Spotify, Apple Podcasts e Google Podcasts.
          </Typography>

          <Typography paragraph>
            Todos estes diretórios funcionam da mesma forma. Entras nestes
            diretórios, registas-te e crias o teu podcast. Algures neste registo
            vai-te ser pedido um RSS Feed. O que é um RSS Feed? Essencialmente é
            o link do teu podcast.
          </Typography>

          <Typography paragraph>
            Podes ir buscar o link do teu podcast à página do podcast. É só
            registar este link nos diretórios, e a partir daqui o processo de
            adicionar episódios é completamente automático! Não precisas de te
            preocupar mais. Sempre que publicares um novo episódio aqui na
            plataforma, os diretórios vão automaticamente exibi-lo na tua página
            do podcast.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Dicas para um melhor Podcast de Comunicação de Ciência */}
      <Accordion style={{ marginBottom: "40px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Algumas dicas para um melhor Podcast e uma melhor Comunicação de
            Ciência
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            É importante fazer chegar a ciência a um público alargado e para
            isso podemos:
          </Typography>
          <Typography paragraph component="ul" style={{ marginLeft: "24px" }}>
            <li>Usar termos simples;</li>
            <li>Evitar utilizar linguagem técnica e frases complexas;</li>
            <li>Não exagerar nas implicações;</li>
            <li>
              Incluir todas as descobertas essenciais para ajudar os ouvintes a
              perceber o conteúdo;
            </li>
          </Typography>
          <Typography paragraph>
            Independentemente do público que pretendemos atingir e o objetivo do
            nosso podcast de Comunicação de Ciência, devemos manter o rigor
            científico. Contudo, devemos simplificar a mensagem para a ajustar
            ao nosso público e ao nosso objetivo.
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
            Informa, sensibiliza e atinge o objetivo. Contudo, pode afastar o
            público geral. Aqui é crucial respondermos às 2 perguntas iniciais.
            O equilíbrio pode estar na identificação da audiência, na adaptação
            da mensagem e na gestão da duração.
          </Typography>
          <Typography paragraph component="ul" style={{ marginLeft: "24px" }}>
            <li>
              Para público informado, técnico e específico, pode-se estender
              entre 30 minutos e uma hora.
            </li>
            <li>
              Para público menos informado, onde pretendemos apenas despertar a
              curiosidade e interesse, a mensagem tem de ser mais curta. Algo
              mais generalista, para despoletar interesse, um podcast curto
              entre 5 e 10 minutos.
            </li>
          </Typography>
          <Typography paragraph>Seguem algumas dicas adicionais:</Typography>
          <Typography paragraph component="ul" style={{ marginLeft: "24px" }}>
            <li>
              Versatilidade da mensagem. O público-alvo pode não ser exatamente
              aquele que antecipamos. A nossa mensagem tem de ser versátil. O
              ritmo de mensagem, tom de mensagem, duração, tem de ser adaptado
              ao diferente público.
            </li>
            <li>
              É importante perceber o público, perceber o que é que eles querem
              ouvir. Envolvê-los de alguma forma, mas seria interessante as
              pessoas sentirem-se como voz ativa.
            </li>
            <li>
              A comédia, como fator de atratividade, pode ser muito vantajosa,
              contudo, tem de ser usada com cuidado para não retirar o rigor
              científico da mensagem.
            </li>
            <li>Não abdicar do trabalho de pesquisa.</li>
            <li>
              Confiança no que estamos a comunicar. Temos de passar a ideia de
              que somos especialistas. A nível da voz, a confiança é chave.
            </li>
            <li>
              Ter carisma e presença são aspetos que apesar do que se pensa se
              pode trabalhar. A voz pode ser trabalhada.
            </li>
            <li>
              Não ser condescendente. Não o podemos ser enquanto locutores.
              Analogias e metáforas ajudam a evitar isto.
            </li>
            <li>
              Devemos aproximar-nos do público, i.e, utilizar linguagem próxima
              ("tu" por exemplo). Linguagem jovem, próxima, quase que a falar
              com colegas e amigos invés de estarmos a falar com um público mais
              afastado.
            </li>
            <li>
              Tentar colocar-nos no lugar da pessoa para quem vamos falar, e
              perceber o que é que eles querem saber a nível científico e para a
              sociedade.
            </li>
            <li>
              Dar exemplos reais da ciência na sociedade para perspectivar e dar
              contexto ao espectador.
            </li>
            <li>
              Atender à idade do nosso público. Crianças → Ritmo lento, mensagem
              mais dinâmica, discurso pouco técnico. Jovens Adultos & adultos →
              Ritmo mais rápido, são o público mais instruído, discurso mais
              técnico. Idosos → Semelhante às crianças, na mensagem que é
              passada, mas cuidado com a forma como a mensagem é passada. Não se
              querem sentir desvalorizados e ser tratados como ignorantes.
            </li>
            <li>
              Rigor científico é sempre importante, contudo, a mensagem pode ser
              transmitida com maior ou menor densidade (Ser mais fácil ou mais
              difícil de entender).
            </li>
            <li>
              A duração não pode ser muito longa. Os podcasts são mais
              consumidos quando estamos a fazer alguma tarefa, passear, viajar,
              quando nos apetece. Um podcast não pode ser demasiado longo,
              porque ou é muito cativante ou as pessoas perdem o interesse.
            </li>
            <li>
              Para público informado e técnico, a duração pode estender-se até 1
              hora. A densidade da informação pode aumentar consideravelmente.
            </li>
            <li>
              Para um público mais desinformado, onde pretendemos apenas
              despertar a curiosidade e interesse, devemos procurar durações
              mais curtas, com o máximo de 30 minutos.
            </li>
            <li>Para crianças, formatos muito curtos.</li>
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Help;

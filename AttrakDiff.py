import matplotlib.pyplot as plt
import numpy as np

respostas_individuais = np.array([
    [
        # Pragmatic quality
      2, 2, 3, 1, 0, 1, 1,
      # Hedonic quality - identity
      3, 1, 2, 1, 2, 3, 2,
      # Hedonic quality - simulation
      2, 2, -1, 2, 2, -1, 2,
      #Attractiveness
      3, 2, 3, 3, 3, 2, 3
    ],
    [
      # Pragmatic quality
      2, 3, 2, 2, 0, 2, 2,
      # Hedonic quality - identity
      2, 0, -1, -2, 2, 2, 1,
      # Hedonic quality - simulation
      3, 2, 0, 2, 2, -2, 2,
      #Attractiveness
      2, 1, 2, 3, 2, 2, 3
    ],
    [
      # Pragmatic quality
      0, 2, 2, 2, 2, 1, 0,
      # Hedonic quality - identity
      2, -1, -2, -1, 2, -2, 0,
      # Hedonic quality - simulation
      2, 1, 0, 2, 1, -1, 0,
      #Attractiveness
      2, 2, 3, 1, 1, 1, 1
    ],
    [
      # Pragmatic quality
      -2, 3, 3, 3, 2, 2, 2,
      # Hedonic quality - identity
      2, 3, 0, -1, 2, 2, 1,
      # Hedonic quality - simulation
      3, 2, 0, 1, 1, 0, 2,
      #Attractiveness
      2, -2, 2, 1, 1, 1, 2
    ],
    [
      # Pragmatic quality
      -1, 1, 1, 0, 2, 1, 3,
      # Hedonic quality - identity
      1, 2, 0, -1, 0, 2, 2,
      # Hedonic quality - simulation
      3, 2, 1, 2, 1, 2, 1,
      #Attractiveness
      2, 2, 2, 1, 2, 1, 1
    ],
    [
      # Pragmatic quality
      -1, 2, 2, 3, 3, 2, 3,
      # Hedonic quality - identity
      1, -1, 1, -2, 2, 0, 1,
      # Hedonic quality - simulation
      0, 2, 2, 2,2, -2, -2,
      #Attractiveness
      2, 1, 2, 2, 2, 2, 2
    ],
    [
      # Pragmatic quality
      2, 2, 2, 1, 0, 0, 1,
      # Hedonic quality - identity
      1, 0, -2, -1, 0, 2, 0,
      # Hedonic quality - simulation
      2, 2, 1, 1, 0, -2, 1,
      #Attractiveness
      -1, -2, -1, 2, 1, 1, 2
    ],
    [
      # Pragmatic quality
      2, 3, 2, 1, 2, 2, 2,
      # Hedonic quality - identity
      2, -2, -1, -1, 1, 2, 1,
      # Hedonic quality - simulation
      3, 2, 1, 3, 2, -1, 1,
      #Attractiveness
      1, -2, 1, 1, 1, 1, 2
    ],
    [
      # Pragmatic quality
      -1, 2, 2, 1, 2, 2, 1,
      # Hedonic quality - identity
      2, 0, -1, -1, 1, 1, 0,
        # Hedonic quality - simulation
      3, 2, 1, 3, 1, -2, -1,
      #Attractiveness
      1, -1, 2, 1, 1, 0, 2
    ],
    [
      # Pragmatic quality
      1, 2, 0, 2, 2, 2, 1,
      # Hedonic quality - identity
      3, -2, -1, -2, 1, 2, 0,
      # Hedonic quality - simulation
      3, 3, 1, 3, 1, -2, -1,
      #Attractiveness
      0, -2, 0, 1, 1, 0, 2
    ],
])


 
 
  
questoes = [
    # Pragmatic quality
    "Technical - Human", "Complicated - Simple", "Impractical - Practical", "Cumbersome - Straightforward", "Unpredictable - Predictable", "Confusing - Clearly structured", "Unruly - Manageable",
    # Hedonic quality - identity
    "Isolating - Connective", "Unprofessional - Professional", "Tacky - Stylish", "Cheap - Premium", "Alienating - Integrating", "Separates me - Brings me closer", "Unpresentable - Presentable",
    # Hedonic quality - simulation
    "Conventional - Inventive", "Unimaginative - Creative", "Cautious - Bold", "Conservative - Innovative", "Dull - Captivating", "Undemanding - Challenging", "Ordinary - Novel",
    #Attractiveness
    "Unpleasant - Pleasant", "Ugly - Attractive", "Disagreeable - Likeable", "Rejecting - Inviting", "Bad - Good", "Repelling - Appealing", "Discouraging - Motivating"
]

# Array of colors for the individual lines
colors = [
    "#507d7c",  # Muted Teal
    "#c28585",  # Dusty Rose
    "#9dbf9e",  # Sage Green
    "#d0b483",  # Pale Mustard
    "#8496b0",  # Light Slate Blue
    "#e0a49f",  # Soft Coral
    "#b5a89c",  # Warm Gray
    "#b3a4c9",  # Lavender Gray
    "#b3c7d6",  # Powder Blue
    "#a5a377"   # Muted Olive
]

# Cria o gráfico
plt.figure(figsize=(6, 10))

# Adicionar as respostas individuais (uma linha para cada participante)
for i, respostas in enumerate(respostas_individuais):
    plt.plot(respostas, np.arange(len(questoes)), marker='o', linestyle='-', color=colors[i % len(colors)], alpha=0.5)

# Calcular a média para cada questão e adicionar no gráfico
respostas_medias = np.mean(respostas_individuais, axis=0)
plt.plot(respostas_medias, np.arange(len(questoes)), marker='o', linestyle='-', color='red', label='Média')

# Configuração dos eixos
plt.xlim(-3, 3)
plt.ylim(-0.5, len(questoes) - 0.5)

# Adicionar as etiquetas das questões
plt.yticks(np.arange(len(questoes)), questoes)
plt.xlabel("Escala de Resposta (-3 a +3)")
plt.title("Perfil de Produto - Respostas Individuais e Média")

# Adicionar a linha central (neutra)
plt.axvline(0, color='black',linewidth=0.5)

# Mostrar legenda
plt.legend()

# Mostrar gráfico
plt.show()

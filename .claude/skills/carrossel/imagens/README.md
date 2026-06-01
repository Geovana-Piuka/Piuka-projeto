# Imagens de Conteúdo — Carrossel

Esta pasta armazena as **fotos reais de produto ou campanha** que serão usadas como conteúdo dos slides do carrossel.

> Diferente de `estilos/`, que contém referências de layout e composição, as imagens aqui são as fotos que vão **aparecer de fato** nas peças geradas.

## Como organizar

Crie uma subpasta por campanha ou tema e coloque as fotos dentro:

```
imagens/
├── dia-das-maes-2026/
│   ├── brinco-flor-rosa.jpg
│   └── conjunto-rose-gold.jpg
├── lancamento-correntes/
│   ├── corrente-prata-fina.jpg
│   └── corrente-dupla-dourada.jpg
└── mix-brincos-verao/
    └── flat-lay-colecao.jpg
```

## Convenção de nomes

- **Subpasta**: slug do tema ou campanha (ex: `dia-das-maes-2026`, `lancamento-correntes`)
- **Arquivo**: nome descritivo do produto ou cena (ex: `brinco-argola-prata.jpg`)
- Evite espaços e acentos nos nomes de arquivo

## Como o agente usa

1. Se você indicar uma pasta explicitamente (ex: "as fotos estão em `imagens/dia-das-maes-2026/`"), o agente usa essa pasta diretamente.
2. Se você não indicar, o agente busca automaticamente em `imagens/` pela subpasta cujo nome se aproxima do tema do briefing.
3. Cada foto encontrada é referenciada no JSON do slide correspondente via campo `foto_conteudo`.
4. Se nenhuma foto for encontrada, o agente segue sem foto de conteúdo e marca isso no briefing.

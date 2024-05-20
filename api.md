<h1>api encontreja.ai</h1>

https://encontreja-ai.vercel.app/api

parametro com array seprarar com virgula:
- ?param=a,b,c

<details> 
   <Summary>/main</Summary>
      
   * [GET](https://encontreja-ai.vercel.app/api/main)
   * params:
      - image: string
</details>
---
<details> 
   <Summary>/pet</Summary>
      
   * [GET](https://encontreja-ai.vercel.app/api/pet)
   * params:
      - id: string
      - type: string
      - gender: string
      - observations: string
      - location: string
      - breeds: string[]
      - colors: string[]
      - size: string[]
      - age: string[]
      ---
   * [POST]()
   * body (json):
      - type: string
      - gender: string
      - observations: string
      - location: string
      - breeds: string[]
      - colors: string[]
      - size: string[]
      - age: string[]   
</details>
---
<details> 
   <Summary>/categoria</Summary>
      
   * [GET](https://encontreja-ai.vercel.app/api/categoria?q=cor)
   * params:
      - q: string
         - raca_cachorro | raca_gato | cor
</details>
---
<details> 
   <Summary>/analisar</Summary>
      
   * [GET](https://encontreja-ai.vercel.app/api/analisar)
   * params:
      - image: string         
</details>
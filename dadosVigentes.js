"use strict";
var facts = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua alice, 10', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '234-5678', true],
  ['joão', 'telefone', '91234-5555', true],
  ['joão', 'telefone', '234-5678', false],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true],
];

const schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];

//função que retorna as tuplas vigentes
function dadosVigentes(facts,schema){
     facts = removeFalse(facts);
     return schema.map(data=>{
        const [atributo, _, cardinalidade] = data;
        switch(cardinalidade){
          case 'one' : return filtrarOne(facts, atributo);
          case 'many' : return filtrarMany(facts, atributo);

         }
       }).flat(1);
}

//função que filtra as tuplas de cardinalidade ‘one’
function filtrarOne(facts, atributo){
        const tupla = facts.filter(fact =>
    fact[1] ===atributo);
       
       const agruparTuplas= tupla.reduce((array, item) =>{
       
             array[item[0]] = item;
         
              return array;
         },[]);

         const tuplasVigentes = [];
        
        for( var indice in agruparTuplas){
           tuplasVigentes.push(agruparTuplas[indice]);
        }
        
           return tuplasVigentes;
}

//função que filtra as tuplas de cardinalidade ‘many’
function filtrarMany(facts,atributo){
    return facts.filter(fact => fact[1] === atributo);
}

//funcao que remove valores false
function removeFalse(facts){
     const removeValoresFalse = facts.filter(fact => !fact[3]);

     let valor;
      
       removeValoresFalse.map(item => valor = facts.filter
      (fact => item[2] !== fact[2]));

       return valor
}

alert(dadosVigentes(facts, schema));

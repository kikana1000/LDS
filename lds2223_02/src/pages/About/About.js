import React from "react";
import "./AboutStyle.css";

function About() {
  return (
    <div className="about">
            <h1 className="font-weight-light">About Traceability</h1>
            <p>
              O objetivo principal do nosso projeto é registar a traceabilidade
              de um/uns produto/s.
            </p>
            <p>
              O nosso pensamento e desenvolvimento deve ser projetado de uma
              maneira abstrata, permitindo assim adaptar a nossa solução a
              diversos cenários. No entanto para um exemplo prático e
              demonstração da aplicação iremos simular a traceabilidade numa
              fábrica de óculos.
            </p>
            <p>
              {" "}
              A tecnologia de web3/blockchain é essencial para garantir a
              imutabilidade dos dados, garantido assim que os dados
              relativamente a todo o processo (desde a recepção dos materiais,
              produção dos óculos e venda ao cliente) sejam mantidos fiéis e
              inalterados permitindo uma posterior análise.
            </p>
            <p>
              {" "}
              Em suma, possibilitamos ao utilizador uma análise exata do
              percurso de vida de cada produto fabricado.
            </p>
          </div>
  );
}

export default About;

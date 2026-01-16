import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";


export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  const titulo = params.get("titulo") || "Sem título";

  const [abaAtiva, setAbaAtiva] = useState("principal");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detalhes do Produto</h2>

      {/* Abas */}
      <div className={styles.tabs}>
        <button
          className={abaAtiva === "principal" ? styles.activeTab : ""}
          onClick={() => setAbaAtiva("principal")}
        >
          Principal
        </button>

        <button
          className={abaAtiva === "estoque" ? styles.activeTab : ""}
          onClick={() => setAbaAtiva("estoque")}
        >
          Estoque
        </button>

        <button
          className={abaAtiva === "preco" ? styles.activeTab : ""}
          onClick={() => setAbaAtiva("preco")}
        >
          Preço
        </button>

        <button
          className={abaAtiva === "performance" ? styles.activeTab : ""}
          onClick={() => setAbaAtiva("performance")}
        >
          Performance
        </button>

        <button
          className={abaAtiva === "compras" ? styles.activeTab : ""}
          onClick={() => setAbaAtiva("compras")}
        >
          Compras
        </button>
      </div>

      {/* Conteúdo da aba */}
      <div className={styles.contentBox}>
        {abaAtiva === "principal" && (
          <PrincipalTab id={id!} titulo={titulo} />
        )}
        {abaAtiva === "estoque" && <EstoqueTab />}
        {abaAtiva === "preco" && <PrecoTab />}
        {abaAtiva === "performance" && <PerformanceTab />}
        {abaAtiva === "compras" && <ComprasTab />}
      </div>
    </div>
  );
};

const PrincipalTab = ({
  id,
  titulo,
}: {
  id: string;
  titulo: string;
}) => {
  const [secao, setSecao] = useState("");

  const secoes = [
    "Cereais",
    "Bebidas",
    "Limpeza",
    "Hortifruti",
    "Padaria",
    "Congelados",
    "Açougue",
  ];

  return (
    <div className={styles.principalContainer}>
      <div className={styles.infoGroup}>
        <label>ID do Produto:</label>
        <span>{id}</span>
      </div>

      <div className={styles.infoGroup}>
        <label>Descrição:</label>
        <span>{titulo}</span>
      </div>

      <div className={styles.infoGroup}>
        <label>Seção:</label>
        <select
          className={styles.select}
          value={secao}
          onChange={(e) => setSecao(e.target.value)}
        >
          <option value="">Selecione...</option>
          {secoes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.imageArea}>
        <div className={styles.imageBox}>Imagem do Produto</div>
      </div>

      <div className={styles.infoGroup}>
        <label>Código de Barras / EAN:</label>
        <span>7891234567890</span>
      </div>
    </div>
  );
};


const EstoqueTab = () => {
  return <p className={styles.placeholder}>⚠ Em breve: Estoque</p>;
};

const PrecoTab = () => {
  return <p className={styles.placeholder}>⚠ Em breve: Preço</p>;
};

const PerformanceTab = () => {
  return <p className={styles.placeholder}>⚠ Em breve: Performance</p>;
};


const ComprasTab = () => {
  return <p className={styles.placeholder}>⚠ Em breve: Compras</p>;
};

import React from "react";

function TitleRowTablaMaterias({titles}) {
  const th = titles ? titles.map((title) =>
    <th key={title} className="text-md">{title}</th>
  ) : null;
  
  return (<>
      <tr>{th}</tr>
    </>
  );
}

export default TitleRowTablaMaterias

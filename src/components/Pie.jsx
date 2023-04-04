import "@grapecity/wijmo.styles/wijmo.css";
//
import * as wijmo from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";

import { useState } from "react";

export default function PieChart() {
  const [data, setData] = useState([
    { brand: "Samsung", sales: 321 },
    { brand: "Apple", sales: 215 },
    { brand: "Huawei", sales: 160 },
    { brand: "OPPO", sales: 112 },
    { brand: "Vivo", sales: 100 },
    { brand: "Others", sales: 638 },
  ]);
  const [palette, setPalette] = useState([
    "rgba(42,159,214,1)",
    "rgba(119,179,0,1)",
    "rgba(153,51,204,1)",
    "rgba(255,136,0,1)",
    "rgba(204,0,0,1)",
    "rgba(0,204,163,1)",
    "rgba(61,109,204,1)",
    "rgba(82,82,82,1)",
    "rgba(0,0,0,1)",
  ]);
  const sum = data.map((c) => c.sales).reduce((sum, cur) => sum + cur);
  function getLabelContent(ht) {
    return wijmo.format("{name} {val:p2}", {
      name: ht.name,
      val: ht.value / sum,
    });
  }
  return (
    <div style={{ marginTop: 20 }}>
      <wjChart.FlexPie
        header="Best-selling Mobile Phones Brands of 2017"
        bindingName="brand"
        binding="sales"
        itemsSource={data}
        palette={palette}
      >
        <wjChart.FlexPieDataLabel
          content={getLabelContent}
        ></wjChart.FlexPieDataLabel>
      </wjChart.FlexPie>
    </div>
  );
}

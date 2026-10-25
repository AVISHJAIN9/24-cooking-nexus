import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const conversions: Record<string, Record<string, number>> = {
  g: { g: 1, kg: 0.001, oz: 0.035274, lb: 0.00220462 },
  kg: { g: 1000, kg: 1, oz: 35.274, lb: 2.20462 },
  oz: { g: 28.3495, kg: 0.0283495, oz: 1, lb: 0.0625 },
  lb: { g: 453.592, kg: 0.453592, oz: 16, lb: 1 },
  ml: { ml: 1, l: 0.001, cup: 0.00422675, tbsp: 0.067628, tsp: 0.202884, "fl oz": 0.033814 },
  l: { ml: 1000, l: 1, cup: 4.22675, tbsp: 67.628, tsp: 202.884, "fl oz": 33.814 },
  cup: { ml: 236.588, l: 0.236588, cup: 1, tbsp: 16, tsp: 48, "fl oz": 8 },
  tbsp: { ml: 14.7868, l: 0.0147868, cup: 0.0625, tbsp: 1, tsp: 3, "fl oz": 0.5 },
  tsp: { ml: 4.92892, l: 0.00492892, cup: 0.0208333, tbsp: 0.333333, tsp: 1, "fl oz": 0.166667 },
  "fl oz": { ml: 29.5735, l: 0.0295735, cup: 0.125, tbsp: 2, tsp: 6, "fl oz": 1 },
};

const weightUnits = ["g", "kg", "oz", "lb"];
const volumeUnits = ["ml", "l", "cup", "tbsp", "tsp", "fl oz"];
const tempUnits = ["°C", "°F"];

export default function ConverterPage() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("cup");
  const [toUnit, setToUnit] = useState("ml");
  const [tempValue, setTempValue] = useState("180");
  const [tempFrom, setTempFrom] = useState("°C");

  const allUnits = [...weightUnits, ...volumeUnits];
  const getCompatibleUnits = (unit: string) => {
    if (weightUnits.includes(unit)) return weightUnits;
    if (volumeUnits.includes(unit)) return volumeUnits;
    return allUnits;
  };

  const convert = () => {
    const v = parseFloat(value) || 0;
    const factor = conversions[fromUnit]?.[toUnit];
    if (factor === undefined) return "N/A";
    return (v * factor).toFixed(4).replace(/\.?0+$/, "");
  };

  const convertTemp = () => {
    const v = parseFloat(tempValue) || 0;
    if (tempFrom === "°C") return `${((v * 9) / 5 + 32).toFixed(1)} °F`;
    return `${(((v - 32) * 5) / 9).toFixed(1)} °C`;
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <h1 className="text-2xl font-display font-bold">Unit Converter</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader><CardTitle className="font-display">Weight & Volume</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input type="number" value={value} onChange={e => setValue(e.target.value)} className="text-2xl font-display text-center" />
            <div className="flex gap-3">
              <Select value={fromUnit} onValueChange={u => { setFromUnit(u); if (!getCompatibleUnits(u).includes(toUnit)) setToUnit(getCompatibleUnits(u)[0]); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{allUnits.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
              </Select>
              <span className="self-center text-muted-foreground">→</span>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{getCompatibleUnits(fromUnit).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="text-center text-3xl font-display font-bold text-primary">{convert()} <span className="text-lg text-muted-foreground">{toUnit}</span></div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="font-display">Temperature</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input type="number" value={tempValue} onChange={e => setTempValue(e.target.value)} className="text-2xl font-display text-center" />
            <div className="flex gap-3 justify-center">
              {tempUnits.map(u => (
                <button key={u} onClick={() => setTempFrom(u)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tempFrom === u ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{u}</button>
              ))}
            </div>
            <div className="text-center text-3xl font-display font-bold text-primary">{convertTemp()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

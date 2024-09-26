"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ZakatCalculator() {
  const [assets, setAssets] = useState({
    cash: "",
    gold: "",
    silver: "",
    other: "",
  });
  const [investments, setInvestments] = useState({
    stocks: "",
    mutualFunds: "",
    realEstate: "",
    other: "",
  });
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);

  const handleAssetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssets((prev) => ({ ...prev, [name]: value }));
  };

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvestments((prev) => ({ ...prev, [name]: value }));
  };

  const calculateZakat = () => {
    const totalAssets = Object.values(assets).reduce((sum, asset) => {
      const assetValue = parseFloat(asset) || 0;
      return sum + assetValue;
    }, 0);

    const totalInvestments = Object.values(investments).reduce(
      (sum, investment) => {
        const investmentValue = parseFloat(investment) || 0;
        return sum + investmentValue;
      },
      0
    );

    const totalWealth = totalAssets + totalInvestments;
    const zakatPayable = totalWealth * 0.025; // 2.5% of total wealth
    setZakatAmount(zakatPayable);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-green-800">
            Islamic Zakat Calculator
          </CardTitle>
          <CardDescription className="text-center text-green-600">
            Calculate your Zakat based on your assets and investments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Assets</h3>
              <div className="space-y-4">
                {Object.entries(assets).map(([key, value]) => (
                  <div key={key} className="flex flex-col space-y-1.5">
                    <Label htmlFor={`asset-${key}`} className="capitalize">
                      {key}
                    </Label>
                    <Input
                      id={`asset-${key}`}
                      name={key}
                      type="number"
                      value={value}
                      onChange={handleAssetChange}
                      placeholder={`Enter your ${key} value`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Investments</h3>
              <div className="space-y-4">
                {Object.entries(investments).map(([key, value]) => (
                  <div key={key} className="flex flex-col space-y-1.5">
                    <Label htmlFor={`investment-${key}`} className="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Input
                      id={`investment-${key}`}
                      name={key}
                      type="number"
                      value={value}
                      onChange={handleInvestmentChange}
                      placeholder={`Enter your ${key
                        .replace(/([A-Z])/g, " $1")
                        .trim()} value`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={calculateZakat}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Calculate Zakat
            </Button>
            {zakatAmount !== null && (
              <div className="mt-4 p-4 bg-green-100 rounded-md">
                <h3 className="text-lg font-semibold text-green-800">
                  Your Zakat Amount:
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {zakatAmount.toFixed(2)}
                </p>
              </div>
            )}
            <div className="mt-6 text-sm text-gray-600">
              <h4 className="font-semibold mb-2">About Zakat:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Zakat is one of the Five Pillars of Islam.</li>
                <li>
                  It's typically calculated as 2.5% of one's wealth above the
                  nisab threshold.
                </li>
                <li>
                  The nisab is approximately the value of 85 grams of gold or
                  595 grams of silver.
                </li>
                <li>
                  Zakat is paid on various types of wealth, including cash,
                  gold, silver, and investments.
                </li>
                <li>
                  This calculator provides a basic estimation. For precise
                  calculations, consult with an Islamic scholar.
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface TableData {
  headers: string[];
  rows: string[][];
}

const TabelaMedicamentos: React.FC = () => {
  const [data, setData] = useState<TableData>({ headers: [], rows: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/DADOS_ABERTOS_MEDICAMENTOS.csv');
        if (!response.ok) {
          throw new Error('Não foi possível carregar o arquivo CSV.');
        }
        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Não foi possível ler o corpo da resposta.');
        }
        const result = await reader.read();
        const decoder = new TextDecoder('iso-8859-1'); // Common encoding for Brazilian public data
        const csvText = decoder.decode(result.value);

        Papa.parse(csvText, {
          complete: (result) => {
            const rowsArray: string[][] = result.data as string[][];
            if (rowsArray.length > 0) {
              const headers = rowsArray[0];
              const rows = rowsArray.slice(1);
              setData({ headers, rows });
            }
            setLoading(false);
          },
          error: (err) => {
            setError('Erro ao processar o arquivo CSV: ' + err.message);
            setLoading(false);
          },
        });
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Ocorreu um erro desconhecido.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index} className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaMedicamentos;

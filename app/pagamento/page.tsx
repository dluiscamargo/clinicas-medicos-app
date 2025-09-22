"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PagamentoContent() {
  const searchParams = useSearchParams();

  const nome = searchParams.get('nome');
  const data = searchParams.get('data');
  const hora = searchParams.get('hora');

  const handlePayment = () => {
    // Aqui você integraria com um gateway de pagamento
    alert(`Pagamento para a consulta com ${nome} em ${data} às ${hora} realizado com sucesso!`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Pagamento da Consulta</h1>
        <div className="space-y-4 mb-8">
          <p><strong>Médico:</strong> {nome}</p>
          <p><strong>Data:</strong> {data}</p>
          <p><strong>Hora:</strong> {hora}</p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-semibold"
        >
          Pagar Agora
        </button>
      </div>
    </div>
  );
}

export default function PagamentoPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <PagamentoContent />
        </Suspense>
    )
}

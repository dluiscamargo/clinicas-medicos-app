import LayoutClinicasEMedicos from "./components/LayoutClinicasEMedicos";
import TabelaMedicamentos from "./components/TabelaMedicamentos";

export default function Page() {
  return (
    <main>
      <LayoutClinicasEMedicos />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Tabela de Medicamentos</h1>
        <TabelaMedicamentos />
      </div>
    </main>
  );
}

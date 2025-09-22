"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Componentes UI simples com Tailwind
export function Button({ children, variant = "default", size = "md", ...props }: any) {
  const base = "px-3 py-1 rounded-md font-medium transition-colors";
  const variants: any = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };
  const sizes: any = { sm: "text-sm", md: "text-md" };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: any) {
  return <div className={`bg-white shadow rounded p-4 ${className}`}>{children}</div>;
}

export function Input({ ...props }: any) {
  return <input className="border p-2 rounded w-full" {...props} />;
}

export function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-sm w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        {children}
      </div>
    </div>
  );
}

// Abas simples
export function Tabs({ children, value, onValueChange }: {
  children: any;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return <div>{children}</div>
}
export function TabsList({ children }: any) { return <div className="flex gap-2 mb-4">{children}</div>; }
export function TabsTrigger({ children, onClick, value }: any) {
  return (
    <button
      onClick={() => onClick(value)}
      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 font-medium"
    >
      {children}
    </button>
  );
}
export function TabsContent({ children }: any) { return <div>{children}</div>; }

// Mock de dados
const medicos = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  nome: `Dr. Médico ${i + 1}`,
  especialidade: i % 3 === 0 ? "Cardiologista" : i % 3 === 1 ? "Dermatologista" : "Ortopedista",
  telefone: "(11) 99999-0000",
  endereco: `Rua Exemplo, ${i + 1} - São Paulo/SP`,
}));

const clinicas = [
  { id: 1, nome: "Clínica Saúde Total", endereco: "Rua A, 123 - São Paulo/SP", medicos: medicos.slice(0, 5) },
  { id: 2, nome: "Clínica Bem Estar", endereco: "Av. B, 456 - São Paulo/SP", medicos: medicos.slice(5, 10) },
  { id: 3, nome: "Clínica Vida Plena", endereco: "Av. C, 789 - São Paulo/SP", medicos: medicos.slice(10, 15) },
  { id: 4, nome: "Clínica Esperança", endereco: "Rua D, 101 - São Paulo/SP", medicos: medicos.slice(15, 20) },
];

const especialidades = [...new Set(medicos.map(m => m.especialidade))];

export default function LayoutClinicasEMedicos() {
  const router = useRouter();
  const [filtro, setFiltro] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [tab, setTab] = useState("medicos");
  const [modo, setModo] = useState("paginacao"); // "paginacao" | "scroll"
  const [layout, setLayout] = useState("lista"); // "lista" | "grade"
  const [paginaMedicos, setPaginaMedicos] = useState(1);
  const [paginaClinicas, setPaginaClinicas] = useState(1);
  const [selectedMedico, setSelectedMedico] = useState<any>(null);
  const [schedulingFor, setSchedulingFor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const porPagina = 4;
  const [visiveisMedicos, setVisiveisMedicos] = useState(4);
  const [visiveisClinicas, setVisiveisClinicas] = useState(2);

  const handleScheduleAppointment = () => {
    if (schedulingFor && selectedDate && selectedTime) {
      const query = new URLSearchParams({
        nome: schedulingFor.nome,
        data: selectedDate.toLocaleDateString('pt-BR'),
        hora: selectedTime,
      }).toString();
      router.push(`/pagamento?${query}`);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();

    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        let isDisabled = false;

        if (isToday) {
          const slotTime = new Date(selectedDate);
          slotTime.setHours(hour, minute, 0, 0);
          if (slotTime < now) {
            isDisabled = true;
          }
        }
        slots.push({ time, isDisabled });
      }
    }
    return slots;
  };

  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Filtragem
  const medicosFiltrados = medicos.filter(m =>
    (m.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      m.especialidade.toLowerCase().includes(filtro.toLowerCase())) &&
    (especialidade ? m.especialidade === especialidade : true)
  );

  const clinicasFiltradas = clinicas.filter(c =>
    (c.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      c.medicos.some(m => m.nome.toLowerCase().includes(filtro.toLowerCase()))) &&
    (especialidade ? c.medicos.some(m => m.especialidade === especialidade) : true)
  );

  // Scroll infinito
  useEffect(() => {
    if (modo !== "scroll") return;
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisiveisMedicos(v => Math.min(v + 4, medicosFiltrados.length));
        setVisiveisClinicas(v => Math.min(v + 2, clinicasFiltradas.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [modo, medicosFiltrados.length, clinicasFiltradas.length]);

  const medicosDisplay = modo === "paginacao" ? medicosFiltrados.slice((paginaMedicos - 1) * porPagina, paginaMedicos * porPagina) : medicosFiltrados.slice(0, visiveisMedicos);
  const clinicasDisplay = modo === "paginacao" ? clinicasFiltradas.slice((paginaClinicas - 1) * porPagina, paginaClinicas * porPagina) : clinicasFiltradas.slice(0, visiveisClinicas);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input placeholder="Pesquisar..." value={filtro} onChange={e => setFiltro(e.target.value)} />
        <select value={especialidade} onChange={e => setEspecialidade(e.target.value)} className="border p-2 rounded">
          <option value="">Todas as especialidades</option>
          {especialidades.map((e, i) => <option key={i} value={e}>{e}</option>)}
        </select>
        <select value={modo} onChange={e => setModo(e.target.value)} className="border p-2 rounded">
          <option value="paginacao">Paginação</option>
          <option value="scroll">Scroll infinito</option>
        </select>
        <select value={layout} onChange={e => setLayout(e.target.value)} className="border p-2 rounded">
          <option value="lista">Lista</option>
          <option value="grade">Grade</option>
        </select>
      </div>

      {/* Abas */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setTab("medicos")}>Médicos</Button>
          <Button onClick={() => setTab("clinicas")}>Clínicas</Button>
        </div>

        {tab === "medicos" && (
          <div className={layout === "grade" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {medicosDisplay.map(m => (
              <Card key={m.id} className="flex flex-col items-start gap-2">
                <h3 className="font-semibold text-gray-900">{m.nome}</h3>
                <p className="text-sm text-gray-600">{m.especialidade}</p>
                <p className="text-xs text-gray-700">{m.telefone}</p>
                <p className="text-xs text-gray-500">{m.endereco}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => setSchedulingFor(m)}>Agendar Consulta</Button>
                  <Button size="sm" variant="outline" onClick={() => setSelectedMedico(m)}>Ver Detalhes</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "clinicas" && (
          <div className={layout === "grade" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"}>
            {clinicasDisplay.map(c => (
              <Card key={c.id}>
                <h3 className="font-semibold text-gray-900">{c.nome}</h3>
                <p className="text-sm text-gray-600">{c.endereco}</p>
                <div className="mt-4 pt-2 border-t">
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Médicos na clínica:</h4>
                  <div className="space-y-2">
                    {c.medicos.map(m => (
                      <div key={m.id} onClick={() => setSelectedMedico(m)} className="p-2 rounded-md hover:bg-blue-50 cursor-pointer transition-colors">
                        <p className="text-sm font-semibold text-gray-800">{m.nome}</p>
                        <p className="text-xs text-gray-600">{m.especialidade}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedMedico} onClose={() => setSelectedMedico(null)}>
        {selectedMedico && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">{selectedMedico.nome}</h2>
            <p className="text-md text-gray-700">{selectedMedico.especialidade}</p>
            <p className="text-sm text-gray-600 pt-4"><strong>Telefone:</strong> {selectedMedico.telefone}</p>
            <p className="text-sm text-gray-600"><strong>Endereço:</strong> {selectedMedico.endereco}</p>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedMedico(null)}>Fechar</Button>
              <Button onClick={() => { setSelectedMedico(null); setSchedulingFor(selectedMedico); }}>Agendar Consulta</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!schedulingFor} onClose={() => setSchedulingFor(null)}>
        {confirmationMessage ? (
          <div className="text-center p-4">
            <h3 className="text-lg font-semibold text-green-600">Sucesso!</h3>
            <p className="text-gray-700">{confirmationMessage}</p>
          </div>
        ) : (
          schedulingFor && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Agendar com {schedulingFor.nome}</h2>
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">Selecione uma data:</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {availableDates.map(date => (
                    <button
                      key={date.toISOString()}
                      onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                      className={`px-3 py-2 rounded-md text-sm whitespace-nowrap ${selectedDate.toDateString() === date.toDateString() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">Selecione um horário:</h3>
                <div className="grid grid-cols-4 gap-2">
                  {generateTimeSlots().map(({ time, isDisabled }) => (
                    <button
                      key={time}
                      disabled={isDisabled}
                      onClick={() => setSelectedTime(time)}
                      className={`px-2 py-2 rounded-md text-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => { setSchedulingFor(null); setSelectedTime(null); }}>Cancelar</Button>
                <Button onClick={handleScheduleAppointment} disabled={!selectedTime}>Confirmar Agendamento</Button>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
}

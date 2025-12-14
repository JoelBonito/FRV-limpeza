import { useState } from 'react'
import { Button, Input, Card, Modal, useToast, Badge, Select } from '@/design-system'
import { Plus, Mail, CheckCircle, Star, AlertCircle, XCircle } from 'lucide-react'

const selectOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'sent', label: 'Enviado' },
    { value: 'approved', label: 'Aprovado' },
    { value: 'lost', label: 'Perdido' },
]

const groupedOptions = [
    { value: 'user1', label: 'João Silva', group: 'Vendedores' },
    { value: 'user2', label: 'Maria Santos', group: 'Vendedores' },
    { value: 'admin', label: 'Administrador', group: 'Sistema' },
]

export function KitchenSink() {
    const toast = useToast()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectValue, setSelectValue] = useState('')
    const [groupedValue, setGroupedValue] = useState('')

    return (
        <div className="p-8 space-y-12 max-w-4xl mx-auto">
            <section>
                <h2 className="text-2xl font-bold mb-4">Typo & Colors</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[var(--primary)] text-white">Primary</div>
                    <div className="p-4 bg-[var(--surface)] border border-[var(--border)]">Surface</div>
                    <div className="p-4 bg-[var(--surface-elevated)]">Surface Elevated</div>
                    <div className="p-4 bg-[var(--error)] text-white">Error</div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Badges</h2>

                {/* Variant Types */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">Variants</h3>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Badge variant="solid" color="primary">Solid</Badge>
                        <Badge variant="soft" color="primary">Soft (Default)</Badge>
                        <Badge variant="outline" color="primary">Outline</Badge>
                    </div>
                </div>

                {/* Colors - Soft */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">Colors (Soft)</h3>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Badge color="neutral">Neutral</Badge>
                        <Badge color="primary">Primary</Badge>
                        <Badge color="success">Success</Badge>
                        <Badge color="warning">Warning</Badge>
                        <Badge color="error">Error</Badge>
                        <Badge color="info">Info</Badge>
                    </div>
                </div>

                {/* Colors - Solid */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">Colors (Solid)</h3>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Badge variant="solid" color="neutral">Neutral</Badge>
                        <Badge variant="solid" color="primary">Primary</Badge>
                        <Badge variant="solid" color="success">Success</Badge>
                        <Badge variant="solid" color="warning">Warning</Badge>
                        <Badge variant="solid" color="error">Error</Badge>
                        <Badge variant="solid" color="info">Info</Badge>
                    </div>
                </div>

                {/* Colors - Outline */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">Colors (Outline)</h3>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Badge variant="outline" color="neutral">Neutral</Badge>
                        <Badge variant="outline" color="primary">Primary</Badge>
                        <Badge variant="outline" color="success">Success</Badge>
                        <Badge variant="outline" color="warning">Warning</Badge>
                        <Badge variant="outline" color="error">Error</Badge>
                        <Badge variant="outline" color="info">Info</Badge>
                    </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">Sizes</h3>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Badge size="sm" color="primary">Small</Badge>
                        <Badge size="md" color="primary">Medium</Badge>
                        <Badge size="lg" color="primary">Large</Badge>
                    </div>
                </div>

                {/* With Dot */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">With Dot Indicator</h3>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Badge color="success" withDot>System Operational</Badge>
                        <Badge color="warning" withDot>Review Needed</Badge>
                        <Badge color="error" withDot>Failed</Badge>
                        <Badge color="info" withDot>v1.0 Beta</Badge>
                    </div>
                </div>

                {/* With Icons */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">With Icons</h3>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Badge variant="solid" color="success" icon={<CheckCircle className="w-3 h-3" />}>Verified</Badge>
                        <Badge variant="soft" color="primary" icon={<Star className="w-3 h-3" />}>Premium</Badge>
                        <Badge variant="outline" color="warning" icon={<AlertCircle className="w-3 h-3" />}>Warning</Badge>
                        <Badge variant="solid" color="error" icon={<XCircle className="w-3 h-3" />}>Blocked</Badge>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Select</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                        label="Status do Orçamento"
                        placeholder="Selecione o status..."
                        options={selectOptions}
                        value={selectValue}
                        onChange={setSelectValue}
                    />
                    <Select
                        label="Com Grupos"
                        placeholder="Escolha uma opção..."
                        options={groupedOptions}
                        value={groupedValue}
                        onChange={setGroupedValue}
                    />
                    <Select
                        label="Tamanho Small"
                        placeholder="Pequeno..."
                        options={selectOptions}
                        size="sm"
                    />
                    <Select
                        label="Tamanho Large"
                        placeholder="Grande..."
                        options={selectOptions}
                        size="lg"
                    />
                    <Select
                        label="Estado de Erro"
                        placeholder="Selecione..."
                        options={selectOptions}
                        error="Campo obrigatório"
                    />
                    <Select
                        label="Desabilitado"
                        placeholder="Não disponível"
                        options={selectOptions}
                        disabled
                    />
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Buttons</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="primary" isLoading>Loading</Button>
                    <Button variant="primary" leftIcon={<Plus size={16} />}>Icon Left</Button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Inputs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Default Input" placeholder="Type something..." />
                    <Input label="With Icon" leftIcon={<Mail size={16} />} placeholder="Email" />
                    <Input label="Error State" error="Invalid email address" value="wrong@" onChange={() => { }} />
                    <Input label="Success State" success="Username available" value="johndoe" onChange={() => { }} />
                    <Input label="Disabled" isDisabled value="Cannot edit" onChange={() => { }} />
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <h3 className="font-bold">Basic Card</h3>
                        <p className="text-[var(--text-secondary)]">Standard padding and shadow.</p>
                    </Card>
                    <Card elevated>
                        <h3 className="font-bold">Elevated Card</h3>
                        <p className="text-[var(--text-secondary)]">Higher shadow for emphasis.</p>
                    </Card>
                    <Card padding="lg" className="border-[var(--primary)]">
                        <h3 className="font-bold text-[var(--primary)]">Active Selection</h3>
                        <p>Custom border and padding.</p>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Feedback & Overlays</h2>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => toast.success('Operation successful!')}>
                        Show Success Toast
                    </Button>
                    <Button variant="destructive" onClick={() => toast.error('Something went wrong.')}>
                        Show Error Toast
                    </Button>
                    <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                        Open Modal
                    </Button>
                </div>
            </section>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
            >
                <div className="space-y-4">
                    <p className="text-[var(--text-secondary)]">
                        This is a standardized modal dialog consistent with the design system.
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

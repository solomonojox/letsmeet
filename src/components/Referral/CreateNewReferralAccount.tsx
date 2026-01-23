import { X } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface BeneficialOwner {
    fullName: string
    ownershipPercentage: number
    identificationNumber: string
    nationality: string
    dateOfBirth: string
    isPEP: boolean
}

interface Props {
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
    loading: boolean;
}

const CreateNewReferralAccount: React.FC<Props> = ({ onClose, onSubmit, loading }) => {
    const [beneficialOwners, setBeneficialOwners] = useState<BeneficialOwner[]>([
        { fullName: '', ownershipPercentage: 0, identificationNumber: '', nationality: '', dateOfBirth: '', isPEP: false }
    ])
    const [kybDocuments, setKybDocuments] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        // Add beneficial owners as JSON string
        formData.append('BeneficialOwners', JSON.stringify(beneficialOwners))

        // Add KYC documents
        kybDocuments.forEach((file, index) => {
            formData.append(`KYBDocuments`, file)
        })

        console.log(formData)

        // Reset beneficial owners and KYC documents
        // setBeneficialOwners([{ fullName: '', ownershipPercentage: 0, identificationNumber: '', nationality: '', dateOfBirth: '', isPEP: false }])
        // setKybDocuments([])

        await onSubmit(formData)
    }

    const addBeneficialOwner = () => {
        setBeneficialOwners([
            ...beneficialOwners,
            { fullName: '', ownershipPercentage: 0, identificationNumber: '', nationality: '', dateOfBirth: '', isPEP: false }
        ])
    }

    const removeBeneficialOwner = (index: number) => {
        if (beneficialOwners.length > 1) {
            setBeneficialOwners(beneficialOwners.filter((_, i) => i !== index))
        }
    }

    const updateBeneficialOwner = (index: number, field: keyof BeneficialOwner, value: string | number | boolean) => {
        const updatedOwners = [...beneficialOwners]
        updatedOwners[index] = {
            ...updatedOwners[index],
            [field]: value
        }
        setBeneficialOwners(updatedOwners)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setKybDocuments([...kybDocuments, ...newFiles])
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const removeDocument = (index: number) => {
        setKybDocuments(kybDocuments.filter((_, i) => i !== index))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 overflow-y-auto">
            <div className='rounded-lg bg-white w-full max-w-4xl mx-auto my-8 p-6 relative h-full max-h-[90vh] overflow-y-auto'>
                <X onClick={onClose} className='w-6 h-6 cursor-pointer absolute top-4 right-4' />
                <p className='text-lg font-medium text-center mb-6'>New Account</p>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="BusinessName" className="block text-sm font-medium">
                                Business Name *
                            </label>
                            <input
                                type="text"
                                id="BusinessName"
                                name="BusinessName"
                                required
                                placeholder="Company name"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="LegalEntityName" className="block text-sm font-medium">
                                Legal Entity Name
                            </label>
                            <input
                                type="text"
                                id="LegalEntityName"
                                name="LegalEntityName"
                                placeholder="Legal entity name"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="RegistrationNumber" className="block text-sm font-medium">
                                Registration Number
                            </label>
                            <input
                                type="text"
                                id="RegistrationNumber"
                                name="RegistrationNumber"
                                placeholder="Registration number"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="TaxIdentificationNumber" className="block text-sm font-medium">
                                Tax Identification Number
                            </label>
                            <input
                                type="text"
                                id="TaxIdentificationNumber"
                                name="TaxIdentificationNumber"
                                placeholder="Tax ID"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="BusinessDescription" className="block text-sm font-medium">
                            Business Description
                        </label>
                        <textarea
                            id="BusinessDescription"
                            name="BusinessDescription"
                            placeholder="Describe the business"
                            rows={3}
                            className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="BusinessEmail" className="block text-sm font-medium">
                                Business Email *
                            </label>
                            <input
                                type="email"
                                id="BusinessEmail"
                                name="BusinessEmail"
                                required
                                placeholder="business@example.com"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="BusinessPhone" className="block text-sm font-medium">
                                Business Phone
                            </label>
                            <input
                                type="tel"
                                id="BusinessPhone"
                                name="BusinessPhone"
                                placeholder="+1234567890"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="BusinessAddress" className="block text-sm font-medium">
                                Business Address
                            </label>
                            <input
                                type="text"
                                id="BusinessAddress"
                                name="BusinessAddress"
                                placeholder="Street address"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="City" className="block text-sm font-medium">
                                City
                            </label>
                            <input
                                type="text"
                                id="City"
                                name="City"
                                placeholder="City"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="State" className="block text-sm font-medium">
                                State
                            </label>
                            <input
                                type="text"
                                id="State"
                                name="State"
                                placeholder="State/Province"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="Country" className="block text-sm font-medium">
                                Country
                            </label>
                            <input
                                type="text"
                                id="Country"
                                name="Country"
                                placeholder="Country"
                                className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                            />
                        </div>
                    </div>

                    {/* Beneficial Owners Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium">
                                Beneficial Owners
                            </label>
                            <button
                                type="button"
                                onClick={addBeneficialOwner}
                                className="text-sm text-primary hover:underline"
                            >
                                + Add Owner
                            </button>
                        </div>

                        {beneficialOwners.map((owner, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Owner #{index + 1}</span>
                                    {beneficialOwners.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeBeneficialOwner(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={owner.fullName}
                                            onChange={(e) => updateBeneficialOwner(index, 'fullName', e.target.value)}
                                            placeholder="Full name"
                                            className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm">Ownership Percentage *</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            max="100"
                                            value={owner.ownershipPercentage}
                                            onChange={(e) => updateBeneficialOwner(index, 'ownershipPercentage', parseFloat(e.target.value))}
                                            placeholder="Percentage"
                                            className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm">Identification Number</label>
                                        <input
                                            type="text"
                                            value={owner.identificationNumber}
                                            onChange={(e) => updateBeneficialOwner(index, 'identificationNumber', e.target.value)}
                                            placeholder="ID number"
                                            className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm">Nationality</label>
                                        <input
                                            type="text"
                                            value={owner.nationality}
                                            onChange={(e) => updateBeneficialOwner(index, 'nationality', e.target.value)}
                                            placeholder="Nationality"
                                            className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm">Date of Birth</label>
                                        <input
                                            type="date"
                                            value={owner.dateOfBirth}
                                            onChange={(e) => updateBeneficialOwner(index, 'dateOfBirth', e.target.value)}
                                            className='w-full p-2 border outline-none focus:border-primary rounded-lg'
                                        />
                                    </div>

                                    <div className="space-y-2 flex items-center">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={owner.isPEP}
                                                onChange={(e) => updateBeneficialOwner(index, 'isPEP', e.target.checked)}
                                                className="rounded"
                                            />
                                            <span className="text-sm">Politically Exposed Person (PEP)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* KYC Documents */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium">
                            KYC Documents
                        </label>

                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                multiple
                                className="hidden"
                                id="kyb-documents"
                            />
                            <label
                                htmlFor="kyb-documents"
                                className="cursor-pointer block"
                            >
                                <p className="text-primary">Click to upload documents</p>
                                <p className="text-sm text-gray-500 mt-1">or drag and drop files here</p>
                                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB each</p>
                            </label>
                        </div>

                        {kybDocuments.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Uploaded Files:</p>
                                <ul className="space-y-2">
                                    {kybDocuments.map((file, index) => (
                                        <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-sm truncate">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeDocument(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type='button'
                            className='w-full p-3 border border-primary text-primary text-sm hover:bg-primary/10 rounded-lg'
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className='w-full p-3 bg-primary text-white text-sm hover:bg-primary/70 rounded-lg'
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Creating...
                                </div>
                            ) : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNewReferralAccount
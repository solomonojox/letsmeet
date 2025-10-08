import React, { useState } from 'react'
import { Feature } from '../../types/Plans'

interface Props {
    onSubmit: (featureData: Feature) => void;
    isOpen: boolean;
    onClose: () => void
}

const AddFeatures: React.FC<Props> = ({ onSubmit, isOpen, onClose }) => {
    const [featureData, setFeatureData] = useState<Feature>({
        featureName: '',
        featureFeatureDescription: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFeatureData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Basic validation
        if (!featureData.featureName.trim()) {
            alert('Feature name is required')
            return
        }

        if (!featureData.featureFeatureDescription.trim()) {
            alert('Feature description is required')
            return
        }

        onSubmit(featureData)

        // Reset form after submission
        setFeatureData({
            featureName: '',
            featureFeatureDescription: ''
        })
    }

    return (
        <div className="fixed inset-0 bg-[#00000066] p-6 flex justify-center items-center z-50 overflow-y-auto">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 w-full md:w-2xl">
                <h3 className="text-lg font-semibold mb-4">Add New Feature</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="featureName" className="block text-sm font-medium text-gray-700 mb-1">
                            Feature Name *
                        </label>
                        <input
                            type="text"
                            id="featureName"
                            name="featureName"
                            value={featureData.featureName}
                            onChange={handleChange}
                            placeholder="Enter feature name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="featureFeatureDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Feature Description *
                        </label>
                        <textarea
                            id="featureFeatureDescription"
                            name="featureFeatureDescription"
                            value={featureData.featureFeatureDescription}
                            onChange={handleChange}
                            placeholder="Enter feature description"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add Feature
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFeatures
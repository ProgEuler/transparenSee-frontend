'use client'

import { useState } from 'react'
import { ETenderProposal, ETenderFilterOptions } from '@/types'
import { ETenderCard } from './ETenderCard'
import { AlertTriangle } from 'lucide-react'

interface ETenderListProps {
  filters: ETenderFilterOptions
  searchQuery: string
}

// Sample data - in a real app, this would come from your API/state
const sampleTenders: ETenderProposal[] = [
  {
    id: 't1',
    refNo: '2024/EDU/001',
    type: 'Goods',
    status: 'live',
    title: 'Procurement of Laptops for Primary Schools', // Added title
    description: 'Procurement of 5000 laptops for primary school students in Dhaka division. The tender aims to enhance digital learning capabilities across rural and urban schools. Specifications include minimum i3 processor, 8GB RAM, and 256GB SSD. Bidders must have a proven track record of delivering similar projects within the last three years. A pre-bid meeting will be held on 2025-01-10. Interested parties are encouraged to review the detailed tender document available on the e-GP portal. The project is funded by the Ministry of Education and aims to be completed by the end of the next fiscal year.',
    ministry: 'Ministry of Education',
    procuringEntity: 'Primary Education Department',
    procuringType: 'Goods',
    publishingDate: '2024-12-01',
    closingDate: '2025-01-31'
  },
  {
    id: 't2',
    refNo: '2024/INFRA/005',
    type: 'Works',
    status: 'live',
    title: 'Construction of Rural Road in Chittagong', // Added title
    description: 'Construction of a 10km rural road in Chittagong district. This project is part of the national infrastructure development plan to improve connectivity and facilitate agricultural transport. The scope includes earthwork, sub-base, base course, and bituminous surfacing. Environmental impact assessment reports are mandatory. Local contractors with valid licenses and experience in road construction are highly encouraged to apply. The project is expected to create numerous local job opportunities and boost regional economic activity. Funding is secured from the Ministry of Infrastructure.',
    ministry: 'Ministry of Infrastructure',
    procuringEntity: 'Public Works Department',
    procuringType: 'Works',
    publishingDate: '2024-11-15',
    closingDate: '2025-01-15'
  },
  {
    id: 't3',
    refNo: '2024/HEALTH/010',
    type: 'Services',
    status: 'closed',
    title: 'Medical Equipment Maintenance Services', // Added title
    description: 'Provision of specialized medical equipment maintenance services for 3 major hospitals in Sylhet. The contract covers a period of three years, ensuring optimal functionality and longevity of critical medical devices. Bidders must demonstrate expertise in maintaining a wide range of diagnostic and therapeutic equipment. A comprehensive service level agreement (SLA) will be part of the contract. This initiative aims to improve healthcare service delivery and patient safety in the region. The tender was highly competitive, attracting both national and international firms.',
    ministry: 'Ministry of Health',
    procuringEntity: 'Directorate General of Health Services',
    procuringType: 'Services',
    publishingDate: '2024-10-01',
    closingDate: '2024-11-30'
  },
  {
    id: 't4',
    refNo: '2024/ICT/003',
    type: 'Consultancy',
    status: 'awarded',
    title: 'E-Governance Framework Development Consultancy', // Added title
    description: 'Consultancy services for developing a national e-governance framework. The selected consultant will be responsible for conducting a needs assessment, designing the architectural blueprint, and providing implementation guidance for various e-governance initiatives. Experience in large-scale public sector digital transformation projects is essential. The framework will standardize digital services across government agencies, improving efficiency and citizen access. The project is a cornerstone of the Digital Bangladesh vision.',
    ministry: 'Ministry of ICT',
    procuringEntity: 'Ministry of ICT',
    procuringType: 'Consultancy',
    publishingDate: '2024-09-01',
    closingDate: '2024-10-30'
  },
  {
    id: 't5',
    refNo: '2024/AGRI/002',
    type: 'Goods',
    status: 'live',
    title: 'Supply of Agricultural Seeds and Fertilizers', // Added title
    description: 'Supply of high-quality agricultural seeds and fertilizers to farmers in Rangpur. This tender supports the government\'s food security program, aiming to boost crop yields and farmer livelihoods. Products must meet national quality standards and be delivered to designated distribution points. Suppliers with robust logistics capabilities and a commitment to sustainable agriculture are preferred. The initiative is crucial for ensuring a stable food supply chain and supporting the agricultural backbone of the economy.',
    ministry: 'Ministry of Agriculture',
    procuringEntity: 'Ministry of Agriculture',
    procuringType: 'Goods',
    publishingDate: '2024-12-10',
    closingDate: '2025-02-10'
  },
  {
    id: 't6',
    refNo: '2024/WATER/007',
    type: 'Works',
    status: 'live',
    title: 'Rehabilitation of Irrigation Canals in Khulna', // Added title
    description: 'Rehabilitation of irrigation canals in Khulna region. This project addresses water management challenges, aiming to improve water distribution efficiency for agricultural lands. The scope includes desilting, bank protection, and minor structural repairs. Contractors must adhere to strict environmental guidelines. The successful completion of this project will significantly enhance irrigation capacity and support local farming communities, contributing to regional development.',
    ministry: 'Ministry of Water Resources',
    procuringEntity: 'Ministry of Water Resources',
    procuringType: 'Works',
    publishingDate: '2024-11-20',
    closingDate: '2025-01-25'
  }
]

export function ETenderList({ filters, searchQuery }: ETenderListProps) {
  const filteredTenders = sampleTenders.filter(tender => {
    const matchesMinistry = !filters.ministry || tender.ministry === filters.ministry
    const matchesProcuringEntity = !filters.procuringEntity || tender.procuringEntity === filters.procuringEntity
    const matchesProcuringType = !filters.procuringType || tender.procuringType === filters.procuringType

    const publishingDate = new Date(tender.publishingDate)
    const closingDate = new Date(tender.closingDate)

    const matchesPublishingDateFrom = !filters.publishingDateFrom || publishingDate >= new Date(filters.publishingDateFrom)
    const matchesPublishingDateTo = !filters.publishingDateTo || publishingDate <= new Date(filters.publishingDateTo)
    const matchesClosingDateFrom = !filters.closingDateFrom || closingDate >= new Date(filters.closingDateFrom)
    const matchesClosingDateTo = !filters.closingDateTo || closingDate <= new Date(filters.closingDateTo)

    const matchesSearchQuery = !searchQuery || 
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Fixed: title now exists
      tender.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.procuringEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.procuringType.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesMinistry && matchesProcuringEntity && matchesProcuringType &&
           matchesPublishingDateFrom && matchesPublishingDateTo &&
           matchesClosingDateFrom && matchesClosingDateTo &&
           matchesSearchQuery
  })

  return (
    <div className="bg-card rounded-xl shadow-sm border p-6">
      {filteredTenders.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No E-Tender proposals found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenders.map(tender => (
            <ETenderCard key={tender.id} tender={tender} />
          ))}
        </div>
      )}
    </div>
  )
}
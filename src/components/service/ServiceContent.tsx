import React from "react";
import { Service } from "../../services/serviceService";
import AccordionCard from "../universal/AccordionCard";
import Button from "../universal/Button";

interface ServicesContentProps {
  services: Service[];
  openService: (service: Service) => void;
}

const ServiceContent: React.FC<ServicesContentProps> = ({
  services,
  openService,
}) => {
  return (
    <AccordionCard title="SERVICES NEARBY">
      <div className="space-y-3">
        {services.map((service) => (
          <Button
            key={service.id}
            text={service.name}
            onClick={() => openService(service)}
          />
        ))}
      </div>
    </AccordionCard>
  );
};

export default ServiceContent;

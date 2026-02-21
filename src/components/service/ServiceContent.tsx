import React from "react";
import { Service } from "../../services/serviceService";
import AccordionCard from "../universal/AccordionCard";
import Button from "../universal/Button";

interface ServicesContentProps {
  services: Service[];
  openService: (service: Service) => void;
  title?: React.ReactNode;
}

const ServiceContent: React.FC<ServicesContentProps> = ({
  services,
  openService,
  title = "SERVICES NEARBY",
}) => {
  return (
    <AccordionCard title={title}>
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

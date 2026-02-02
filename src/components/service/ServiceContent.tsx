import React from "react";
import AccordionCard from "../universal/AccordionCard";
import Button from "../universal/Button";
import { Service } from "../../pages/ServicePage";

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
            text={service.title}
            onClick={() => openService(service)}
          />
        ))}
      </div>
    </AccordionCard>
  );
};

export default ServiceContent;

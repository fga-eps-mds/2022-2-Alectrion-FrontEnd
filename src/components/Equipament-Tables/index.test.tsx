import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Providers from "../../utils/test-utils";

import EquipamentsTables, { equipament } from "./index";
test("should list equipament", async () => {
    const location = {
        state: {
            userId: "1",
        },
        key: "teste",
    };
    const equipaments = [
        {
          id: 'e0fad936-e0d4-4545-962b-32481cfea2b7',
          tippingNumber: '123456',
          serialNumber: '10030',
          type: 'MONITOR',
          situacao: 'ACTIVE',
          model: 'model teste',
          description: 'descricao 1',
          initialUseDate: new Date(),
          screenSize: '17',
          invoiceNumber: '122312',
          power: null,
          screenType: 'IPS',
          processor: null,
          storageType: null,
          storageAmount: null,
          brand: {
            id: '9665097d-045e-4a99-9ae6-43db3beb6573',
            name: 'teste marca2'
          },
          acquisition: {
            id: 'eaac274d-ff34-46a0-aa36-7b1256eb8d52',
            name: 'teste acquisition type 2'
          },
          unit: {
            name: '15 DP',
            localization: 'Valparaíso de Goiás'
          },
          ram_size: '12',
          createdAt: '2022-09-19T05:13:44.662Z',
          acquisitionDate: new Date()
        },
        {
          id: 'deea105f-a413-4fdc-b729-468fd1740d82',
          tippingNumber: '654321',
          serialNumber: '10031',
          type: 'CPU',
          situacao: 'TECHNICAL_RESERVE',
          model: 'model teste',
          description: 'descricao 2',
          initialUseDate: new Date(),
          screenSize: '17',
          invoiceNumber: '342304',
          power: null,
          screenType: 'IPS',
          processor: null,
          storageType: null,
          storageAmount: null,
          brand: {
            id: '9665097d-045e-4a99-9ae6-43db3beb6573',
            name: 'teste marca2'
          },
          acquisition: {
            id: 'eaac274d-ff34-46a0-aa36-7b1256eb8d52',
            name: 'teste acquisition type 2'
          },
          unit: {
            name: '15 DP',
            localization: 'Valparaíso de Goiás'
          },
          ram_size: '12',
          createdAt: '2022-09-19T05:13:44.662Z',
          acquisitionDate: new Date()
        }
      ] as unknown as equipament[]
    
    const selectedEquipments = {}
    const setSelectedEquipments = () => {}

    render(
        <Providers location={location}>
            <EquipamentsTables equipaments={equipaments} selectedEquipments={selectedEquipments} setSelectedEquipments={setSelectedEquipments} />
        </Providers>
    );

    expect(screen.getByText("MONITOR")).toBeInTheDocument();
    expect(screen.getByText("123456")).toBeInTheDocument();
    expect(screen.getByText("10030")).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();

    expect(screen.getByText("CPU")).toBeInTheDocument();
    expect(screen.getByText("654321")).toBeInTheDocument();
    expect(screen.getByText("10031")).toBeInTheDocument();
    expect(screen.getByText("TECHNICAL_RESERVE")).toBeInTheDocument();
});

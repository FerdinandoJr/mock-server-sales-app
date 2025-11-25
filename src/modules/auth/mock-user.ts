import { User } from "./entities/user";
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { Company } from "./entities/company";
import { generateFakerAddress } from "../customers/mock-customer";
import { CompanyGroup } from "./entities/company-group";


export function generateMockUser(): User {
    const userId = faker.number.int({ min: 1, max: 10000 })

    return {
        userId: userId,
        userCode: userId.toString().padStart(5, "0"),
        userName: faker.company.name(),
        token: uuidv4()
    };
}


export function generateFakerCompanyGroup(index: number) : CompanyGroup {
    return {
        groupId: index,
        companies: generateFakerCompanyList()
    }
}


export function generateFakerCompanyGroupList(): CompanyGroup[] {
    return Array.from({ length: faker.number.int({ min: 1, max: 5 })}, (_, i) => {
        return generateFakerCompanyGroup(i + 1)
    })

}

export function generateFakerCompanyList(): Company[] {
    return Array.from({ length: faker.number.int({ min: 1, max: 5 })}, (_, i) => {
        return {
            companyId: i + 1,
            tradeName: faker.company.name(),
            realName: faker.company.name(),
            cnpj: faker.string.numeric(14),
            address: generateFakerAddress(0),
            isPrimary: i == 0
        }
    })
}
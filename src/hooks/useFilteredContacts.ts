import { useEffect, useState } from "react";
import { FilterFormValues } from "src/components/FilterForm";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const useFilteredContacts = (contacts: ContactDto[], groups: GroupContactsDto[]) => {
const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>(contacts)
  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contacts;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupContacts = groups.find(({id}) => id === fv.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({id}) => (
          groupContacts.contactIds.includes(id)
        ))
      }
    }

    setFilteredContacts(findContacts)
  }

  useEffect(()=> {
    setFilteredContacts(contacts)
  }, [contacts])
  return {filteredContacts, onSubmit}
}



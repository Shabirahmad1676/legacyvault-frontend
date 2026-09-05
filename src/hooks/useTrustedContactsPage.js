"use client";

import { useState } from "react";

import {
  useTrustedContacts,
  useAddTrustedContact,
  useRemoveTrustedContact,
  useUpdateQuorum,
} from "./useLegacyVault";

export function useTrustedContactsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [contactToRemove, setContactToRemove] = useState(null);

  // Trusted contacts
  const {
    data: contacts = [],
    isLoading: contactsLoading,
  } = useTrustedContacts();

  // Mutations
  const addContactMutation = useAddTrustedContact();
  const removeContactMutation = useRemoveTrustedContact();
  const updateQuorumMutation = useUpdateQuorum();

  /*
   * IMPORTANT:
   * Your current useLegacyVault.js does NOT provide
   * the current quorum threshold.
   *
   * Therefore, do not pretend we can get it from the
   * trusted contacts query.
   *
   * Use the value from your existing session/auth state
   * when you have that available.
   */
  const quorumThreshold = 2;

  // -----------------------------
  // Add contact
  // -----------------------------

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    if (addContactMutation.isPending) return;

    setIsAddModalOpen(false);
  };

  const addContact = async (payload) => {
    try {
      await addContactMutation.mutateAsync(payload);

      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add trusted contact:", error);
    }
  };

  // -----------------------------
  // Remove contact
  // -----------------------------

  const openRemoveModal = (contact) => {
    setContactToRemove(contact);
    setIsRemoveModalOpen(true);
  };

  const closeRemoveModal = () => {
    if (removeContactMutation.isPending) return;

    setIsRemoveModalOpen(false);
    setContactToRemove(null);
  };

  const removeContact = async () => {
    if (!contactToRemove) return;

    try {
      await removeContactMutation.mutateAsync(
        contactToRemove.trust_link_id
      );

      setIsRemoveModalOpen(false);
      setContactToRemove(null);
    } catch (error) {
      console.error(
        "Failed to remove trusted contact:",
        error
      );
    }
  };

  // -----------------------------
  // Quorum
  // -----------------------------

  const updateQuorum = async (value) => {
    try {
      await updateQuorumMutation.mutateAsync({
        quorum_threshold: value,
      });
    } catch (error) {
      console.error(
        "Failed to update quorum:",
        error
      );
    }
  };

  return {
    // Data
    contacts,
    quorumThreshold,

    // Loading states
    loading: contactsLoading,
    adding: addContactMutation.isPending,
    removing: removeContactMutation.isPending,
    updatingQuorum: updateQuorumMutation.isPending,

    // Add modal
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    addContact,

    // Remove modal
    isRemoveModalOpen,
    contactToRemove,
    openRemoveModal,
    closeRemoveModal,
    removeContact,

    // Quorum
    updateQuorum,
  };
}
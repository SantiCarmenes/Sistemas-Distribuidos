// src/components/addFavoriteModal.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Fragment } from "react";
import { useAddFavorite } from "@/hooks/useFavorites";

// Esquema de Validacion
const FavoriteSchema = Yup.object().shape({
  nickname: Yup.string()
    .max(50, "¡Muy largo! (Máx 50)"),
  description: Yup.string()
    .max(100, "Descripción muy larga (Máx 100)"),
});

interface FormValues {
  nickname: string;
  description: string;
}

interface AddFavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: {
    id: number;
    name: string;
    imageUrl: string;
  } | null;
}

export default function AddFavoriteModal({ isOpen, onClose, pokemon }: AddFavoriteModalProps) {
  const addFavoriteMutation = useAddFavorite();

  if (!pokemon) return null;
  
  const initialValues: FormValues = {
    nickname: pokemon.name, 
    description: "",
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    addFavoriteMutation.mutate(
      {
        id: pokemon.id,
        name: pokemon.name,
        imageUrl: pokemon.imageUrl,
        nickname: values.nickname || undefined,
        description: values.description || undefined,
      },
      {
        onSuccess: () => {
          setSubmitting(false);
          onClose();
        },
        onError: (error) => {
          setSubmitting(false);
          alert(`Error al guardar: ${error.message}`);
        },
      }
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Agregar a {pokemon.name} a la lista de favoritos
                </Dialog.Title>
                <div className="mt-3">
                  <img src={pokemon.imageUrl} alt={pokemon.name} className="w-24 h-24 mx-auto" />
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={FavoriteSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form className="mt-4 space-y-4">
                      
                      <div>
                        <label htmlFor="nickname" className="block text-sm font-semibold text-gray-300 mb-1">
                          Apodo (Opcional)
                        </label>
                        <Field
                          type="text"
                          id="nickname"
                          name="nickname"
                          placeholder={pokemon.name}
                          className="w-full px-4 py-2 text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 capitalize"
                        />
                        <ErrorMessage name="nickname" component="div" className="mt-1 text-sm text-red-400" />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-1">
                          Descripción (Opcional)
                        </label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          rows={3}
                          placeholder="Añade una descripción sobre el pokemon..."
                          className="w-full px-4 py-2 text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                        />
                        <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-400" />
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-gray-500 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none"
                          onClick={onClose}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting || !isValid} 
                          className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Guardando..." : "Guardar Favorito"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
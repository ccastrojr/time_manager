export default function validate(availability) {
  if (availability.length !== 0) {
    // Definiremos as regras para validar esse JSON depois
    return availability;
  }

  /* Caso não preencha seu horários, a aplicação entederá que o professor
   * que o professor está disponível todos os dias e retornará null.
   */

  return null;
}

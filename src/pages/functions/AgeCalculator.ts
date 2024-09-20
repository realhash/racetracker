export const calculateAge = (dateString: Date): number => {
    const birthDate = new Date(dateString);
    const currentDate = new Date();
    
    const yearDiff =  currentDate.getFullYear() - birthDate.getFullYear();
    
    const hasBirthdayPassed =
      currentDate.getMonth() > birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate());
  
    return hasBirthdayPassed ? yearDiff : yearDiff - 1;
  };
  
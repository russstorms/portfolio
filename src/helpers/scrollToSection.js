export const scrollToSection = (section) => {
  const element = document.getElementById(section);
  const navbarHeight = 68; // Adjust based on your actual navbar height
  const offset = navbarHeight; // Extra space for better visibility

  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  }
};

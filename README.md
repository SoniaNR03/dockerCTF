# 🛡️ Diseño e implementación de una plataforma CTF basada en contenedores

Este proyecto consiste en el desarrollo de una **plataforma web de CTFs (Capture The Flag)** orientada al ámbito académico. Permite lanzar desafíos de seguridad informática a través de contenedores Docker, ofreciendo a los usuarios un entorno práctico para el aprendizaje de técnicas y vulnerabilidades reales.

---

## 📌 Índice

- [🎯 Objetivo](#-objetivo)
- [🚀 Características principales](#-características-principales)
- [🧰 Requisitos previos](#-requisitos-previos)
- [⚙️ Instrucciones de despliegue](#️-instrucciones-de-despliegue)
- [🧪 Desafíos disponibles](#-desafíos-disponibles)
- [🛠️ Estructura del proyecto](#️-estructura-del-proyecto)
- [📚 Contexto académico](#-contexto-académico)
- [📄 Licencia](#-licencia)

---

## 🎯 Objetivo

El objetivo principal de este Trabajo de Fin de Grado es diseñar una **plataforma CTF personalizable**, capaz de desplegar entornos aislados mediante Docker, con retos que abordan distintas vulnerabilidades web y de sistema. La plataforma busca proporcionar un medio accesible y práctico para la enseñanza de la ciberseguridad.

---

## 🚀 Características principales

- ✅ Interfaz web interactiva.
- 🐳 Ejecución de contenedores Docker por reto.
- 🧩 Configuración dinámica de desafíos mediante un archivo JSON.
- 🧑‍💻 Validación automática de flags.
- 🔐 Control de acceso y gestión de sesiones.

---

## 🧰 Requisitos previos

Asegúrate de tener instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Instrucciones de despliegue

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tuusuario/plataforma-ctf-tfg.git
   cd plataforma-ctf-tfg
   docker-compose up --build
   ```

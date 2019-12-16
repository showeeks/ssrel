import {Config} from "./utils/Config";
import sqlite from 'sqlite';

test('test parse ssr subscription api', async () => {
    // const resp = await axios.get("https://www.kiwiss.cc/link/1p7FJThsG3EiCDWp")
    const data = "c3NyOi8vZDNkM0xtZHZiMmRzWlM1amIyMDZNVHBoZFhSb1gyTm9ZV2x1WDJFNlkyaGhZMmhoTWpBNmRHeHpNUzR5WDNScFkydGxkRjloZFhSb09sbHVTbXhaVjNReldWZDRjeThfYjJKbWMzQmhjbUZ0UFNad2NtOTBiM0JoY21GdFBTWnlaVzFoY210elBUVlpiWEExVERKYU5YSlhRalpaWlZBM04zbGhUMFJqZFU1VVZXeEpSR2N6VEdwVk1WSXdTU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL2QzZDNMbWR2YjJkc1pTNWpiMjA2TWpwaGRYUm9YMk5vWVdsdVgyRTZZMmhoWTJoaE1qQTZkR3h6TVM0eVgzUnBZMnRsZEY5aGRYUm9PbGx1U214WlYzUXpXVmQ0Y3k4X2IySm1jM0JoY21GdFBTWndjbTkwYjNCaGNtRnRQU1p5WlcxaGNtdHpQVFpNTFVnMWNIbG1OWEJsTWpaYVpUQTNOM2xoVFdwQmVVMURNSGROYVRCNVRWTkJlRTE2YjNoUFZHOTNUbWNtWjNKdmRYQTlVekJzV0ZOVFFrSlJNRTVHVkVWV1UxRldVbEJWWncKc3NyOi8vYTJsM2FXaHJMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZFaDJka3B5Y0hCd2JtMTFTemg0U1U5cGJtaDFiV2xyWlMwNGFrOWhOSFZQWVVscUxTMDRhazlUTkdrdGFUbDJVU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL2FHczVMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZFeDJka3B5Y0hCd2JtMTFTemg1U1U5cGJtaDFiV2xyWlMwNGFrOWhOSFZQWVVscUxTMDRhazlUTkdrdGFUbDJVU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL2FHczFMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZGQjJka3B5Y0hCd2JtMTFTemg2U1U5cGJtaDFiV2xyWlMwNGFrOWhOSFZQWVVscUxTMDRhazlUTkdrdGFUbDJVU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL2FHczJMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZGUjJka3B5Y0hCd2JtMTFTemd3U1U5cGJtaDFiV2xyWlMwNGFrOWhOSFZQWVVscUxTMDRhazlUTkdrdGFUbDJVU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL2FHc3lMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZGaDJka3B5Y0hCd2JtMTFTemd4U1U5cGJtaDFiV2xyWlMwNGFrOWhOSFZQWVVscUxTMDRhazlUTkdrdGFUbDJVU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL05ESXVNakF3TGpFek1DNHlPVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZHSjJka3B5Y0hCd2JtMTFTemd5U1U5cGJtaDFiV2xyWlMwNGFrOWhOSFZQWVVscUxTMDRhazlUTkdrdGFUbDJVU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL2FHc3pMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZHWjJka3B5Y0hCd2JtMTFTemd6U1U5cGJtaDFiV2xyWlMwNGFrOWhOSFZQWVVscUxTMDRhazlUTkdrdGFUbDJVU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL2FHczBMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZHcDJka3B5Y0hCd2JtMTFTemcwU1U5cGJtaDFiV2xyWlMwNGFrOWhOSFZQWVVscUxTMDRhazlUTkdrdGFUbDJVU1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL2FHczNMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZVVjNOemQ1WVRaaFlWbzFjbWwyVFZSQlp6WkxaVWMyWVV0U056ZDVUVFZ5YVRRMWIybFFOemQ1VFRWTWFVdzJUREk1Sm1keWIzVndQVk13YkZoVFUwSkNVVEJPUmxSRlZsTlJWbEpRVldjCnNzcjovL2FHczRMbVZoZEhWdkxtTnZiVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUlZVVjROemQ1WVRaaFlWbzFjbWwyVFZSRlp6WkxaVWMyWVV0U056ZDVUVFZ5YVRRMWIybFFOemQ1VFRWTWFVdzJUREk1Sm1keWIzVndQVk13YkZoVFUwSkNVVEJPUmxSRlZsTlJWbEpRVldjCnNzcjovL01UZ3VNVGMyTGpFNU9DNDRPVG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUmFraDJka3B5YTNWS2VtdDFjWGQ0U1U5cGJtaDFiV2xyWlMwNGFrOVROR2t0YVRsMlVTWm5jbTkxY0QxVE1HeFlVMU5DUWxFd1RrWlVSVlpUVVZaU1VGVm4Kc3NyOi8vTVRndU1UYzJMakV3TUM0eE1qWTZNVEEzT0RFNllYVjBhRjloWlhNeE1qaGZjMmhoTVRwamFHRmphR0V5TUMxcFpYUm1PblJzY3pFdU1sOTBhV05yWlhSZllYVjBhRHBhUnpsUFZEQnNNRnB0VW5KYWJYUXpMejl2WW1aemNHRnlZVzA5WXpJNWJXUklaR2hqYlZWMFdrYzVNMkp0ZUhaWlYxRjFZbGRzYW1OdE9YcGlNbG93VEcxT2RtSlJKbkJ5YjNSdmNHRnlZVzA5Sm5KbGJXRnlhM005VVdwTWRuWktjbXQxU25wcmRYRjNlVWxQYVc1b2RXMXBhMlV0T0dwUFV6UnBMV2s1ZGxFbVozSnZkWEE5VXpCc1dGTlRRa0pSTUU1R1ZFVldVMUZXVWxCVlp3CnNzcjovL01UTXVNak13TGpJd09DNDJOem94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUmFsQjJka3B5YTNWS2VtdDFjWGQ2U1U5cGJtaDFiV2xyWlMwNGFrOVROR2t0YVRsMlVTWm5jbTkxY0QxVE1HeFlVMU5DUWxFd1RrWlVSVlpUVVZaU1VGVm4Kc3NyOi8vTVRndU1UYzJMamM0TGpJeU5Eb3hNRGM0TVRwaGRYUm9YMkZsY3pFeU9GOXphR0V4T21Ob1lXTm9ZVEl3TFdsbGRHWTZkR3h6TVM0eVgzUnBZMnRsZEY5aGRYUm9PbHBIT1U5VU1Hd3dXbTFTY2xwdGRETXZQMjlpWm5Od1lYSmhiVDFqTWpsdFpFaGthR050VlhSYVJ6a3pZbTE0ZGxsWFVYVmlWMnhxWTIwNWVtSXlXakJNYlU1MllsRW1jSEp2ZEc5d1lYSmhiVDBtY21WdFlYSnJjejFSYWxSMmRrcHlhM1ZLZW10MWNYY3dTVTlwYm1oMWJXbHJaUzA0YWs5VE5Ha3RhVGwyVVNabmNtOTFjRDFUTUd4WVUxTkNRbEV3VGtaVVJWWlRVVlpTVUZWbgpzc3I6Ly9OVFF1TVRrNUxqRTNNUzR5TURRNk1UQTNPREU2WVhWMGFGOWhaWE14TWpoZmMyaGhNVHBqYUdGamFHRXlNQzFwWlhSbU9uUnNjekV1TWw5MGFXTnJaWFJmWVhWMGFEcGFSemxQVkRCc01GcHRVbkphYlhRekx6OXZZbVp6Y0dGeVlXMDlZekk1YldSSVpHaGpiVlYwV2tjNU0ySnRlSFpaVjFGMVlsZHNhbU50T1hwaU1sb3dURzFPZG1KUkpuQnliM1J2Y0dGeVlXMDlKbkpsYldGeWEzTTlVV3BZZG5aS2NtdDFTbnByZFhGM01VbFBhVzVvZFcxcGEyVXRPR3BQVXpScExXazVkbEVtWjNKdmRYQTlVekJzV0ZOVFFrSlJNRTVHVkVWV1UxRldVbEJWWncKc3NyOi8vTXk0eE1UVXVNVGM0TGpJNU9qRXdOemd4T21GMWRHaGZZV1Z6TVRJNFgzTm9ZVEU2WTJoaFkyaGhNakF0YVdWMFpqcDBiSE14TGpKZmRHbGphMlYwWDJGMWRHZzZXa2M1VDFRd2JEQmFiVkp5V20xME15OF9iMkptYzNCaGNtRnRQV015T1cxa1NHUm9ZMjFWZEZwSE9UTmliWGgyV1ZkUmRXSlhiR3BqYlRsNllqSmFNRXh0VG5aaVVTWndjbTkwYjNCaGNtRnRQU1p5WlcxaGNtdHpQVkZxWW5aMlNuSnJkVXA2YTNWeGR6SkpUMmx1YUhWdGFXdGxMVGhxVDFNMGFTMXBPWFpSSm1keWIzVndQVk13YkZoVFUwSkNVVEJPUmxSRlZsTlJWbEpRVldjCnNzcjovL01UQTBMakkxTVM0eU1qVXVNVEU1T2pFd056Z3hPbUYxZEdoZllXVnpNVEk0WDNOb1lURTZZMmhoWTJoaE1qQXRhV1YwWmpwMGJITXhMakpmZEdsamEyVjBYMkYxZEdnNldrYzVUMVF3YkRCYWJWSnlXbTEwTXk4X2IySm1jM0JoY21GdFBXTXlPVzFrU0dSb1kyMVZkRnBIT1ROaWJYaDJXVmRSZFdKWGJHcGpiVGw2WWpKYU1FeHRUblppVVNad2NtOTBiM0JoY21GdFBTWnlaVzFoY210elBWRjZTSFoyU25KdWRtODNiRzAzTUhoSlJXUktVVk16YjNBMFluQnZjRWgyZGtsNmJYVk1hbTFwU1Y5MmRrbDZhM1ZKZG05MllqQW1aM0p2ZFhBOVV6QnNXRk5UUWtKUk1FNUdWRVZXVTFGV1VsQlZadwpzc3I6Ly9kWE5oTWk0ek16SXlMbTl5WnpveE1EYzRNVHBoZFhSb1gyRmxjekV5T0Y5emFHRXhPbU5vWVdOb1lUSXdMV2xsZEdZNmRHeHpNUzR5WDNScFkydGxkRjloZFhSb09scEhPVTlVTUd3d1dtMVNjbHB0ZERNdlAyOWlabk53WVhKaGJUMWpNamx0WkVoa2FHTnRWWFJhUnprelltMTRkbGxYVVhWaVYyeHFZMjA1ZW1JeVdqQk1iVTUyWWxFbWNISnZkRzl3WVhKaGJUMG1jbVZ0WVhKcmN6MVJla3gyZGtweWJuWnZOMnh0TnpCNVNVVTFSRlZETTI5d05HSndiM0JJZG5aSmVtMTFUR3B0YVVsZmRuWkplbXQxU1hadmRtSXdKbWR5YjNWd1BWTXdiRmhUVTBKQ1VUQk9SbFJGVmxOUlZsSlFWV2MKc3NyOi8vTVRBMExqSTFNUzR5TWpVdU1UTTNPakV3TnpneE9tRjFkR2hmWVdWek1USTRYM05vWVRFNlkyaGhZMmhoTWpBdGFXVjBaanAwYkhNeExqSmZkR2xqYTJWMFgyRjFkR2c2V2tjNVQxUXdiREJhYlZKeVdtMTBNeThfYjJKbWMzQmhjbUZ0UFdNeU9XMWtTR1JvWTIxVmRGcEhPVE5pYlhoMldWZFJkV0pYYkdwamJUbDZZakphTUV4dFRuWmlVU1p3Y205MGIzQmhjbUZ0UFNaeVpXMWhjbXR6UFZGNlVIWjJTbkp1ZG04M2JHMDNNSHBKUldSS1VWTXpiM0EwWW5CdmNFaDJka2w2YlhWTWFtMXBTVjkyZGtsNmEzVkpkbTkyWWpBbVozSnZkWEE5VXpCc1dGTlRRa0pSTUU1R1ZFVldVMUZXVWxCVlp3CnNzcjovL2RYTmhOeTR6TXpJeUxtOXlaem94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxUmVtWjJka3B5Ym5adk4yeHROekF6U1VVMVJGVkRNMjl3TkdKd2IzQklkblpKZW0xMVRHcHRhVWxmZG5aSmVtdDFTWFp2ZG1Jd0ptZHliM1Z3UFZNd2JGaFRVMEpDVVRCT1JsUkZWbE5SVmxKUVZXYwpzc3I6Ly9kWE5oT0M0ek16SXlMbTl5WnpveE1EYzRNVHBoZFhSb1gyRmxjekV5T0Y5emFHRXhPbU5vWVdOb1lUSXdMV2xsZEdZNmRHeHpNUzR5WDNScFkydGxkRjloZFhSb09scEhPVTlVTUd3d1dtMVNjbHB0ZERNdlAyOWlabk53WVhKaGJUMWpNamx0WkVoa2FHTnRWWFJhUnprelltMTRkbGxYVVhWaVYyeHFZMjA1ZW1JeVdqQk1iVTUyWWxFbWNISnZkRzl3WVhKaGJUMG1jbVZ0WVhKcmN6MVJlbXAyZGtweWJuWnZOMnh0TnpBMFNVVTFSRlZETTI5d05HSndiM0JJZG5aSmVtMTFUR3B0YVVsZmRuWkplbXQxU1hadmRtSXdKbWR5YjNWd1BWTXdiRmhUVTBKQ1VUQk9SbFJGVmxOUlZsSlFWV2MKc3NyOi8vWW1Vd01qQmxaV1l0TWpZek55MDBNR1UwTFRobU5EQXRabVZoT1RZMVltWTNOREkwTG1Sa2JuTXViVzl2Ym5adExtNWxkRG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxU1JFaDJka3B5YkdvM1JHMTFZalI0U1VWb1NreGxhVzVvZFcxcGEyVXRPR3BQWVRSMVQyRkphaTB0T0dwUFV6UnBMV2s1ZGxFbVozSnZkWEE5VXpCc1dGTlRRa0pSTUU1R1ZFVldVMUZXVWxCVlp3CnNzcjovL04yTXdNemt6Wm1VdE9UWm1ZeTAwWVRZekxUaGxPVEF0WTJJeFlqSXlPVE5qWmpobExtUmtibk11Ylc5dmJuWnRMbTVsZERveE1EYzRNVHBoZFhSb1gyRmxjekV5T0Y5emFHRXhPbU5vWVdOb1lUSXdMV2xsZEdZNmRHeHpNUzR5WDNScFkydGxkRjloZFhSb09scEhPVTlVTUd3d1dtMVNjbHB0ZERNdlAyOWlabk53WVhKaGJUMWpNamx0WkVoa2FHTnRWWFJhUnprelltMTRkbGxYVVhWaVYyeHFZMjA1ZW1JeVdqQk1iVTUyWWxFbWNISnZkRzl3WVhKaGJUMG1jbVZ0WVhKcmN6MVNSRXgyZGtweWJHbzNSRzExWWpSNVNVVm9Ta3hsYVc1b2RXMXBhMlV0T0dwUFlUUjFUMkZKYWkwdE9HcFBVelJwTFdrNWRsRW1aM0p2ZFhBOVV6QnNXRk5UUWtKUk1FNUdWRVZXVTFGV1VsQlZadwpzc3I6Ly9NMlppWWpWak5tUXRNakk1WkMwME1HSXhMV0ZrWWpBdE9UTTVOMkkwTldRM05HWTVMbVJrYm5NdWJXOXZiblp0TG01bGREb3hNRGM0TVRwaGRYUm9YMkZsY3pFeU9GOXphR0V4T21Ob1lXTm9ZVEl3TFdsbGRHWTZkR3h6TVM0eVgzUnBZMnRsZEY5aGRYUm9PbHBIT1U5VU1Hd3dXbTFTY2xwdGRETXZQMjlpWm5Od1lYSmhiVDFqTWpsdFpFaGthR050VlhSYVJ6a3pZbTE0ZGxsWFVYVmlWMnhxWTIwNWVtSXlXakJNYlU1MllsRW1jSEp2ZEc5d1lYSmhiVDBtY21WdFlYSnJjejFTUkZCMmRrcHliR28zUkcxMVlqUjZTVVZvU2t4bGFXNW9kVzFwYTJVdE9HcFBZVFIxVDJGSmFpMHRPR3BQVXpScExXazVkbEVtWjNKdmRYQTlVekJzV0ZOVFFrSlJNRTVHVkVWV1UxRldVbEJWWncKc3NyOi8vWm1JNVlqUTBOMlF0TVdKaE15MDBZamcxTFdFME5UWXRZVFJoTWpkaU1EUXhaalEyTG1Sa2JuTXViVzl2Ym5adExtNWxkRG94TURjNE1UcGhkWFJvWDJGbGN6RXlPRjl6YUdFeE9tTm9ZV05vWVRJd0xXbGxkR1k2ZEd4ek1TNHlYM1JwWTJ0bGRGOWhkWFJvT2xwSE9VOVVNR3d3V20xU2NscHRkRE12UDI5aVpuTndZWEpoYlQxak1qbHRaRWhrYUdOdFZYUmFSemt6WW0xNGRsbFhVWFZpVjJ4cVkyMDVlbUl5V2pCTWJVNTJZbEVtY0hKdmRHOXdZWEpoYlQwbWNtVnRZWEpyY3oxU1JGUjJka3B5YkdvM1JHMTFZalF3U1VWb1NreGxhVzVvZFcxcGEyVXRPR3BQWVRSMVQyRkphaTB0T0dwUFV6UnBMV2s1ZGxFbVozSnZkWEE5VXpCc1dGTlRRa0pSTUU1R1ZFVldVMUZXVWxCVlp3CnNzcjovL01UQXpMakV6TXk0eE5USXVNVGN4T2pFd056Z3hPbUYxZEdoZllXVnpNVEk0WDNOb1lURTZZMmhoWTJoaE1qQXRhV1YwWmpwMGJITXhMakpmZEdsamEyVjBYMkYxZEdnNldrYzVUMVF3YkRCYWJWSnlXbTEwTXk4X2IySm1jM0JoY21GdFBXTXlPVzFrU0dSb1kyMVZkRnBIT1ROaWJYaDJXVmRSZFdKWGJHcGpiVGw2WWpKYU1FeHRUblppVVNad2NtOTBiM0JoY21GdFBTWnlaVzFoY210elBWSkVXSFoyU25Kc2FqZEViWFZpTkRGSlJXaEtUR1ZwYm1oMWJXbHJaUzA0YWs5aE5IVlBZVWxxTFMwNGFrOVROR2t0YVRsMlVTWm5jbTkxY0QxVE1HeFlVMU5DUWxFd1RrWlVSVlpUVVZaU1VGVm4Kc3NyOi8vTlRRdU1UZ3dMakU1TkM0eE9EYzZNVEEzT0RFNllYVjBhRjloWlhNeE1qaGZjMmhoTVRwamFHRmphR0V5TUMxcFpYUm1PblJzY3pFdU1sOTBhV05yWlhSZllYVjBhRHBhUnpsUFZEQnNNRnB0VW5KYWJYUXpMejl2WW1aemNHRnlZVzA5WXpJNWJXUklaR2hqYlZWMFdrYzVNMkp0ZUhaWlYxRjFZbGRzYW1OdE9YcGlNbG93VEcxT2RtSlJKbkJ5YjNSdmNHRnlZVzA5Sm5KbGJXRnlhM005VW1wSWRuWktjbkJ1Tm01c2JUY3dlQ1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL01UTXVNVEkxTGpFNU15NHlNREk2TVRBM09ERTZZWFYwYUY5aFpYTXhNamhmYzJoaE1UcGphR0ZqYUdFeU1DMXBaWFJtT25Sc2N6RXVNbDkwYVdOclpYUmZZWFYwYURwYVJ6bFBWREJzTUZwdFVuSmFiWFF6THo5dlltWnpjR0Z5WVcwOVl6STViV1JJWkdoamJWVjBXa2M1TTJKdGVIWlpWMUYxWWxkc2FtTnRPWHBpTWxvd1RHMU9kbUpSSm5CeWIzUnZjR0Z5WVcwOUpuSmxiV0Z5YTNNOVVtcE1kblpLY25CdU5tNXNiVGN3ZVNabmNtOTFjRDFUTUd4WVUxTkNRbEV3VGtaVVJWWlRVVlpTVUZWbgpzc3I6Ly9NVE11TWpBNUxqRTBOQzR5TmpveE1EYzRNVHBoZFhSb1gyRmxjekV5T0Y5emFHRXhPbU5vWVdOb1lUSXdMV2xsZEdZNmRHeHpNUzR5WDNScFkydGxkRjloZFhSb09scEhPVTlVTUd3d1dtMVNjbHB0ZERNdlAyOWlabk53WVhKaGJUMWpNamx0WkVoa2FHTnRWWFJhUnprelltMTRkbGxYVVhWaVYyeHFZMjA1ZW1JeVdqQk1iVTUyWWxFbWNISnZkRzl3WVhKaGJUMG1jbVZ0WVhKcmN6MVNhbEIyZGtweWNHNDJibXh0TnpCNkptZHliM1Z3UFZNd2JGaFRVMEpDVVRCT1JsUkZWbE5SVmxKUVZXYwpzc3I6Ly9NVGd1TVRNNUxqSXlNQzQxTlRveE1EYzRNVHBoZFhSb1gyRmxjekV5T0Y5emFHRXhPbU5vWVdOb1lUSXdMV2xsZEdZNmRHeHpNUzR5WDNScFkydGxkRjloZFhSb09scEhPVTlVTUd3d1dtMVNjbHB0ZERNdlAyOWlabk53WVhKaGJUMWpNamx0WkVoa2FHTnRWWFJhUnprelltMTRkbGxYVVhWaVYyeHFZMjA1ZW1JeVdqQk1iVTUyWWxFbWNISnZkRzl3WVhKaGJUMG1jbVZ0WVhKcmN6MVRWRWgyZGtweWJXeHlSR3hwY1VSc2JtRkZlQ1puY205MWNEMVRNR3hZVTFOQ1FsRXdUa1pVUlZaVFVWWlNVRlZuCnNzcjovL015NHhMakV6TlM0Mk5Eb3hNRGM0TVRwaGRYUm9YMkZsY3pFeU9GOXphR0V4T21Ob1lXTm9ZVEl3TFdsbGRHWTZkR3h6TVM0eVgzUnBZMnRsZEY5aGRYUm9PbHBIT1U5VU1Hd3dXbTFTY2xwdGRETXZQMjlpWm5Od1lYSmhiVDFqTWpsdFpFaGthR050VlhSYVJ6a3pZbTE0ZGxsWFVYVmlWMnhxWTIwNWVtSXlXakJNYlU1MllsRW1jSEp2ZEc5d1lYSmhiVDBtY21WdFlYSnJjejFUVkV4MmRrcHliV3h5Ukd4cGNVUnNibUZGZVNabmNtOTFjRDFUTUd4WVUxTkNRbEV3VGtaVVJWWlRVVlpTVUZWbgpzc3I6Ly9NVGd1TVRNMkxqRTROQzR4TXpJNk1UQTNPREU2WVhWMGFGOWhaWE14TWpoZmMyaGhNVHBqYUdGamFHRXlNQzFwWlhSbU9uUnNjekV1TWw5MGFXTnJaWFJmWVhWMGFEcGFSemxQVkRCc01GcHRVbkphYlhRekx6OXZZbVp6Y0dGeVlXMDlZekk1YldSSVpHaGpiVlYwV2tjNU0ySnRlSFpaVjFGMVlsZHNhbU50T1hwaU1sb3dURzFPZG1KUkpuQnliM1J2Y0dGeVlXMDlKbkpsYldGeWEzTTlVMVJRZG5aS2NtMXNja1JzYVhGRWJHNWhSWG9tWjNKdmRYQTlVekJzV0ZOVFFrSlJNRTVHVkVWV1UxRldVbEJWWncKc3NyOi8vTVRndU1UUXdMakl3TXk0eE9UTTZNVEEzT0RFNllYVjBhRjloWlhNeE1qaGZjMmhoTVRwamFHRmphR0V5TUMxcFpYUm1PblJzY3pFdU1sOTBhV05yWlhSZllYVjBhRHBhUnpsUFZEQnNNRnB0VW5KYWJYUXpMejl2WW1aemNHRnlZVzA5WXpJNWJXUklaR2hqYlZWMFdrYzVNMkp0ZUhaWlYxRjFZbGRzYW1OdE9YcGlNbG93VEcxT2RtSlJKbkJ5YjNSdmNHRnlZVzA5Sm5KbGJXRnlhM005VTFSVWRuWktjbTFzY2tSc2FYRkViRzVoUlRBbVozSnZkWEE5VXpCc1dGTlRRa0pSTUU1R1ZFVldVMUZXVWxCVlp3Cg"
    Config.fromSubscription(data)

    // expect(resp.data).toBe("")
    // resp.data
})

test('test parse ssr link', async () => {
    const data = "ssr://aGs2LmVhdHVvLmNvbToxMDc4MTphdXRoX2FlczEyOF9zaGExOmNoYWNoYTIwLWlldGY6dGxzMS4yX3RpY2tldF9hdXRoOlpHOU9UMGwwWm1SclptdDMvP29iZnNwYXJhbT1jMjltZEhkaGNtVXRaRzkzYm14dllXUXViV2xqY205emIyWjBMbU52YlEmcHJvdG9wYXJhbT0mcmVtYXJrcz1RVFR2dkpycHBwbm11SzgwSU9pbmh1bWlrZS04ak9hNHVPYUlqLS04ak9TNGktaTl2USZncm91cD1TMGxYU1NCQlEwTkZURVZTUVZSUFVn"
    Config.fromSSRLink(data)
})

test('test sqlite3 create table', async () => {
    try {
        const db = await sqlite.open("./database/a.sqlite");
        // await db.run('CREATE TABLE lorem (info TEXT)')
        const stmt = await db.prepare("INSERT INTO lorem VALUES (?)");
        for (var i = 0; i < 10; i++) {
            await stmt.run("Ipsum " + i);
        }
        await stmt.finalize();
        await db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            console.log(row.id + ": " + row.info);
        });
    } catch (err) {
        console.log(err)
    }
})

test('test save record to db', async () => {
    const db = await sqlite.open("./database/data.sqlite")
    await db.run(`create table ssr_config
(
    remarks     varchar(255) not null
        primary key,
    server      varchar(255),
    server_port int,
    method      varchar(255),
    obfs        varchar(255),
    obfsparam   varchar(255),
    password    varchar(255),
    protocol    varchar(255),
    enable      int
);`)
    const data = "ssr://aGs2LmVhdHVvLmNvbToxMDc4MTphdXRoX2FlczEyOF9zaGExOmNoYWNoYTIwLWlldGY6dGxzMS4yX3RpY2tldF9hdXRoOlpHOU9UMGwwWm1SclptdDMvP29iZnNwYXJhbT1jMjltZEhkaGNtVXRaRzkzYm14dllXUXViV2xqY205emIyWjBMbU52YlEmcHJvdG9wYXJhbT0mcmVtYXJrcz1RVFR2dkpycHBwbm11SzgwSU9pbmh1bWlrZS04ak9hNHVPYUlqLS04ak9TNGktaTl2USZncm91cD1TMGxYU1NCQlEwTkZURVZTUVZSUFVn"
    let fromSSRLink = Config.fromSSRLink(data);
    await fromSSRLink.res?.save()
})

test('fetch data from db', async() => {
    const db = await sqlite.open("database/test.sqlite")
})
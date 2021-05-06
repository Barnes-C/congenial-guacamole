import { AdsModel } from './../src/api/models/ads';
/* eslint-disable no-unused-vars */
import {
  // analyze,
  // analyzeBeschreibung,
  // analyzeKonto,
  analyzeMetadaten,
  // analyzePreis,
  analyzeSonstiges,
  analyzeTitel,
} from '../src/services/analyze';
import { afterAll, beforeAll, describe, test } from '@jest/globals';
import { createTestserver } from './testserver';
import { expect } from 'chai';
import { Ad1, Ad2, Ad3 } from './testAds';
import type { Server } from 'http';

let server: Server;

// Test-Suite
describe('Analyze Ads', () => {
  beforeAll(async () => {
    server = await createTestserver();
  });

  afterAll(() => {
    server.close();
  });

  test('Analyze titel', async () => {

    // keine Merkmale enthalten
    const result1 = await analyzeTitel(Ad1, new AdsModel());

    // Titel enthält nicht neu
    expect(result1.titel_enthaelt_neu).to.be.equal(0);

    // Titel enthält nicht ovp
    expect(result1.titel_enthaelt_ovp).to.be.equal(0);

    // Titel enthält nicht verschweißt
    expect(result1.titel_enthaelt_verschweißt).to.be.equal(0);

    // Titel enthält nicht ungeöffnet
    expect(result1.titel_enthaelt_ungeoeffnet).to.be.equal(0);

    // Titel enthält kein Zeichen
    expect(result1.titel_enthaelt_zeichen).to.be.equal(0);

    // Anitpattern: Titel enthält nicht gebraucht
    expect(result1.ap_titel_enthaelt_gebraucht).to.be.equal(0);

    // Antipattern: Titel enthält keine suche
    expect(result1.ap_titel_enthaelt_suche).to.be.equal(0);

    // Antipattern: Titel enthält nicht tausche
    expect(result1.ap_titel_enthaelt_tausche).to.be.equal(0);

    // Antipattern: Titel enthält keine Sammlung
    expect(result1.ap_titel_enthaelt_sammlung).to.be.equal(0);

    // Antipattern: Titel enthält nicht Kilo
    expect(result1.ap_titel_enthaelt_kilo).to.be.equal(0);

    // Betrugsmerkmale enthalten
    const result2 = await analyzeTitel(Ad2, new AdsModel());

    // Titel enthält neu
    expect(result2.titel_enthaelt_neu).to.be.equal(1);

    // Titel enthält ovp
    expect(result2.titel_enthaelt_ovp).to.be.equal(1);

    // Titel enthält verschweißt
    expect(result2.titel_enthaelt_verschweißt).to.be.equal(1);

    // Titel enthält ungeöffnet
    expect(result2.titel_enthaelt_ungeoeffnet).to.be.equal(1);

    // Titel enthält ein Zeichen
    expect(result2.titel_enthaelt_zeichen).to.be.equal(1);

    // Anitpattern: Titel enthält nicht gebraucht
    expect(result2.ap_titel_enthaelt_gebraucht).to.be.equal(0);

    // Antipattern: Titel enthält keine suche
    expect(result2.ap_titel_enthaelt_suche).to.be.equal(0);

    // Antipattern: Titel enthält nicht tausche
    expect(result2.ap_titel_enthaelt_tausche).to.be.equal(0);

    // Antipattern: Titel enthält keine Sammlung
    expect(result2.ap_titel_enthaelt_sammlung).to.be.equal(0);

    // Antipattern: Titel enthält nicht Kilo
    expect(result2.ap_titel_enthaelt_kilo).to.be.equal(0);

    const result3 = await analyzeTitel(Ad3, new AdsModel());

    // Titel enthält nicht neu
    expect(result3.titel_enthaelt_neu).to.be.equal(0);

    // Titel enthält nicht ovp
    expect(result3.titel_enthaelt_ovp).to.be.equal(0);

    // Titel enthält nicht verschweißt
    expect(result3.titel_enthaelt_verschweißt).to.be.equal(0);

    // Titel enthält nicht ungeöffnet
    expect(result3.titel_enthaelt_ungeoeffnet).to.be.equal(0);

    // Titel enthält kein Zeichen
    expect(result3.titel_enthaelt_zeichen).to.be.equal(0);

    // Anitpattern: Titel enthält gebraucht
    expect(result3.ap_titel_enthaelt_gebraucht).to.be.equal(1);

    // Antipattern: Titel enthält suche
    expect(result3.ap_titel_enthaelt_suche).to.be.equal(1);

    // Antipattern: Titel enthält tausche
    expect(result3.ap_titel_enthaelt_tausche).to.be.equal(1);

    // Antipattern: Titel enthält Sammlung
    expect(result3.ap_titel_enthaelt_sammlung).to.be.equal(1);

    // Antipattern: Titel enthält Kilo
    expect(result3.ap_titel_enthaelt_kilo).to.be.equal(1);
  });

  test('Analyze description', async () => {});

  test('Analyze account', async () => {});

  test('Analyze price', async () => {});

  test('Analyze metadata', async () => {
    const result1 = await analyzeMetadaten(Ad1, new AdsModel());
    const result2 = await analyzeMetadaten(Ad2, new AdsModel());

    expect(result1.metadata_category).to.be.equal(Ad1.category.id);
    expect(result1.metadata_amount_pictures).to.be.equal(6);
    expect(result1.metadata_phone).to.be.equal(1);
    expect(result1.metadata_startDateTime).to.be.equal(1614434831000);

    expect(result2.metadata_category).to.be.equal(Ad1.category.id);
    expect(result2.metadata_amount_pictures).to.be.equal(6);
    expect(result2.metadata_phone).to.be.equal(1);
    expect(result2.metadata_startDateTime).to.be.equal(1614434831000);
  });

  test('Analyze misc.', async () => {
    const result1 = await analyzeSonstiges(Ad1, new AdsModel());

    expect(result1.sonstiges_anzeige_kopiert).to.be.equal('1');
    expect(result1.ap_sonstiges_anzeige_nur_abholung).to.be.equal('1');
    expect(result1.ap_sonstiges_anzeige_suche).to.be.equal('1');
    expect(result1.ap_sonstiges_anzeige_zeit_tag).to.be.equal('1');
  });

  test('Analyze all', async () => {});
});

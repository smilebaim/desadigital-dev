'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ siteName, contactAddress, contactEmail, contactPhone }: { 
  siteName?: string, 
  contactAddress?: string,
  contactEmail?: string,
  contactPhone?: string
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-32 md:pb-16 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-black text-emerald-700 tracking-tighter mb-6">
              {siteName || 'Desa Digital'}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Mewujudkan tata kelola desa yang transparan, akuntabel, dan mandiri melalui pemanfaatan teknologi informasi untuk kesejahteraan masyarakat.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Layanan Publik</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/layanan/persuratan" className="hover:text-emerald-600 transition-colors">Persuratan Mandiri</Link></li>
              <li><Link href="/dana-desa" className="hover:text-emerald-600 transition-colors">Transparansi Anggaran</Link></li>
              <li><Link href="/tata-ruang" className="hover:text-emerald-600 transition-colors">Peta Dana Desa</Link></li>
              <li><Link href="/dashboard" className="hover:text-emerald-600 transition-colors">Dasbor Warga</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Kontak & Lokasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-500 leading-snug">
                    {contactAddress || 'Alamat kantor desa belum diatur.'}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>{contactPhone || '-'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>{contactEmail || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>© {currentYear} {siteName || 'Website Desa'}. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-emerald-600 transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
